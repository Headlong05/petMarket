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



