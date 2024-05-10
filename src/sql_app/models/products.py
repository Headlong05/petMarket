from sqlalchemy import Integer, Sequence, String, Boolean, DateTime, Column, ForeignKey, UniqueConstraint
from sqlalchemy.orm import mapped_column, Mapped, relationship

from settings import DataBase
from sql_app.base import Base

class Product(Base):
    __tablename__ = 'market'
    __table_args__ = {'schema': DataBase.SCHEMA}

    id: Mapped[int] = mapped_column(
        Integer,
        Sequence('market_id_seq', metadata=Base.metadata),
        primary_key=True,
        nullable=False
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[float] = mapped_column(Integer, nullable=False)
    photo: Mapped[str] = mapped_column(String, nullable=False)
    is_deleted: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

###

