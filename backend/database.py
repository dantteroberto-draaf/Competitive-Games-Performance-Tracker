# Importações
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Caminho da base de dados
url_database = "postgresql://postgres:301072@localhost:5432/tracker_db"

# Criando a engine
engine = create_engine(url_database)

# Sessão para ler ou gravar uma partida
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()