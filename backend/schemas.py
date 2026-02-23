from pydantic import BaseModel
from datetime import datetime

class PartidaBase(BaseModel):
    jogo: str
    resultado: str
    abates: int
    mortes: int
    assistencias: int

class PartidaCreate(PartidaBase):
    pass

class PartidaResponse(PartidaBase):
    id: int
    data_registro: datetime

    class Config:
        from_attributes = True