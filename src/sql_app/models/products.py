from sqlalchemy import Integer, Sequence, String, Boolean, DateTime, Column, ForeignKey, UniqueConstraint, func
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
    basket_items = relationship("Basket", back_populates="product")
###

class Basket(Base):
    __tablename__ = 'basket'
    __table_args__ = {'schema': DataBase.SCHEMA}

    id: Mapped[int] = mapped_column(
        Integer,
        Sequence('basket_id_seq', metadata=Base.metadata),
        primary_key=True,
        nullable=False
    )
    market_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(f"{DataBase.SCHEMA}.market.id", ondelete="CASCADE"),
        nullable=False
    )
    date: Mapped[DateTime] = mapped_column(
        DateTime,
        nullable=False,
        default=func.now()
    )
    count: Mapped[int] = mapped_column(Integer, nullable=False)
    product = relationship("Product", back_populates="basket_items")

    product: Mapped["Product"] = relationship("Product", back_populates="basket_items")

    __table_args__ = (
        UniqueConstraint('market_id', 'date', name='unique_basket_item'),
    )