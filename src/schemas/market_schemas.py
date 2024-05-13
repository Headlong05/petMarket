from typing import Optional

from pydantic import BaseModel
from datetime import datetime

class CreateProduct(BaseModel):
    name: str
    description: str
    price: float
    photo: str

class ViewProduct(CreateProduct):
    id: int

class AllProduct(ViewProduct):
    is_deleted: bool



###

class CreateBasketItem(BaseModel):
    market_id: int
    count: int

class ProductData(BaseModel):
    id: int
    name: str
    description: str
    price: float
    photo: str
    is_deleted: bool

class ViewBasketItem(CreateBasketItem):
    id: int
    date: str
    product_data: Optional[ProductData] = None

    @classmethod
    def from_orm(cls, obj):
        product_data = ProductData.from_orm(obj.product) if obj.product else None
        return cls(
            id=obj.id,
            market_id=obj.market_id,
            count=obj.count,
            date=cls.format_date(obj.date),
            product_data=product_data
        )

    @staticmethod
    def format_date(date: datetime) -> str:
        return date.isoformat()

    class Config:
        orm_mode = True