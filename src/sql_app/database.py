from sqlalchemy.orm import sessionmaker

from settings import DataBase
from sqlalchemy import create_engine
SQL_ALCHEMY_DATABASE_URL = DataBase.URL
engine = create_engine(
    SQL_ALCHEMY_DATABASE_URL,
    pool_pre_ping=True
)
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)