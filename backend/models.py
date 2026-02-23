from database import Base
from sqlalchemy import Integer, String, Column, DateTime
from sqlalchemy.sql import func

class Partida(Base):
    
    # nome exato da tabela
    __tablename__ = "partidas"

    # id(chave primária)
    id = Column(Integer, primary_key=True, index=True)

    # criando outras colunas
    jogo = Column(String, index=True)
    resultado = Column(String)
    abates = Column(Integer)
    mortes = Column(Integer)
    assistencias = Column(Integer)

    data_registro = Column(DateTime(timezone=True), server_default=func.now())

