from typing import List
from datetime import datetime

from sqlalchemy import select, and_
from sqlalchemy.orm import Session

from schemas import market_schemas
from sql_app.models import products

def create_product(
    name: str,
    description: str,
    price: float,
    photo:str,
    db: Session
) -> products.Product:
    product_instance = products.Product(
        name=name,
        description=description,
        price=price, photo=photo
    )
    db.add(product_instance)
    db.commit()
    db.refresh(product_instance)
    return product_instance

def get_product(
    product_id: int,
    db: Session
) -> products.Product:
    q = select(products.Product).where(
        and_(
            products.Product.id == product_id,
            products.Product.is_deleted != True
        )
    )
    result = db.scalar(q)
    return result

def list_products(
        limit: int,
        offset: int,
        db: Session
) -> List[products.Product]:
    q = select(
        products.Product
    ).where(
        products.Product.is_deleted != True
    ).limit(limit).offset(offset)
    result = db.scalars(q)
    return result

def update_product(
        product_obj: products.Product,
        product_data: market_schemas.ViewProduct,
        db: Session
) -> products.Product:
    product_obj.name = product_data.name
    product_obj.description = product_data.description
    product_obj.price =product_data.price
    product_obj.photo =product_data.photo
    db.commit()
    db.refresh(product_obj)
    return product_obj

def delete_product(
        product_obj: products.Product,
        db: Session
) -> products.Product:
    product_obj.is_deleted = True
    db.commit()
    db.refresh(product_obj)
    return product_obj


#####


