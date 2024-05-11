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

class ViewBasketItem(CreateBasketItem):
    id: int
    date: datetime

    class Config:
        orm_mode = True