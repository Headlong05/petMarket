from sqlalchemy import MetaData
from sqlalchemy.ext.declarative import declarative_base
from settings import DataBase
Base=declarative_base(metadata=MetaData(schema=DataBase.SCHEMA))