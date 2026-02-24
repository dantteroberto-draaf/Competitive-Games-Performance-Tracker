from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import schemas, database as db, models

# inicializando a api
app = FastAPI()

# criar a tabela
models.Base.metadata.create_all(bind=db.engine)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=['*'])

# O response_model avisa que a resposta será uma lista do schema
@app.get("/partidas", response_model=list[schemas.PartidaResponse])
def listar_partidas(sessao_db: Session = Depends(db.get_db)):
    
    partidas = sessao_db.query(models.Partida).all()

    return partidas

@app.post("/partidas", response_model=schemas.PartidaResponse)
def registrar_partida(partida_recebida: schemas.PartidaCreate # recebe o JSON do frontend
                      , sessao_db: Session = Depends(db.get_db)): # abre a conexão com o banco
    
    # a nova partida vai ser um objeto da classe Partida
    # comando .model_dump() serve para "desempacotar" os dados da classe automaticamente
    nova_partida = models.Partida(**partida_recebida.model_dump())

    sessao_db.add(nova_partida)
    sessao_db.commit()

    sessao_db.refresh(nova_partida)

    return nova_partida

@app.delete("/partidas/{partida_id}")
def remover_partida(partida_id: int,
                    sessao_db: Session = Depends(db.get_db)):
    
    partida_encontrada = sessao_db.query(models.Partida).filter(models.Partida.id == partida_id).first()

    # tratamento de erros, caso a partida não seja encontrada
    if partida_encontrada is None:
        raise HTTPException(status_code=404, detail="Partida não encontrada")
    
    # excluindo a partida e salvando a alteração no banco de dados
    sessao_db.delete(partida_encontrada)
    sessao_db.commit()



    return {"mensagem": f"A partida {partida_id} foi removida com sucesso!"}

# rota para mostrar as estatísticas do jogador
@app.get("/stats")
def exibir_stats(sessao_db: Session = Depends(db.get_db)):
    todas_as_partidas = sessao_db.query(models.Partida).all()

    total = len(todas_as_partidas)
    vitorias = 0
    derrotas = 0
    abates = 0
    mortes = 0
    assistencias = 0

    # caso não haja partidas registradas
    if total == 0:
        return {
            "total_partidas": 0,
            "total_vitorias": 0,
            "total_derrotas": 0,
            "taxa_vitoria": 0.0,
            "total_abates": 0,
            "total_mortes": 0,
            "total_assists": 0,
            "ama_medio": 0
        }
    
    for partida in todas_as_partidas:
        abates += partida.abates
        mortes += partida.mortes
        assistencias += partida.assistencias

        if partida.resultado == "Vitória":
            vitorias += 1
        else:
            derrotas += 1

    winrate = vitorias/total * 100

    ama = (abates + assistencias) / mortes

    return {
        "total_partidas": total,
        "total_vitorias": vitorias,
        "total_derrotas": derrotas,
        "taxa_vitoria": round(winrate, 1), # arredondando a taxa de vitórias para 1 casa decimal
        "total_abates": abates,
        "total_mortes": mortes,
        "total_assists": assistencias,
        "ama_medio": round(ama, 2)
    }