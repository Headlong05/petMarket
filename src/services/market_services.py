from typing import List
from datetime import datetime
from starlette.exceptions import HTTPException
from sqlalchemy import select, and_
from sqlalchemy.orm import Session, joinedload

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


def create_basket_item(
    market_id: int,
    count: int,
    db: Session
) -> products.Basket:
    product = db.get(products.Product, market_id)
    if not product:
        raise HTTPException(status_code=404, detail=f"Product with id {market_id} not found")
        return None
    basket_item = products.Basket(
        market_id=market_id,
        count=count
    )
    db.add(basket_item)
    db.commit()
    db.refresh(basket_item)
    return basket_item
def get_basket_items(
    db: Session
) -> List[products.Basket]:
    q = select(products.Basket).options(joinedload(products.Basket.product))
    result = db.scalars(q)
    return result
def get_basket_item(
        basket_item_id: int,
        db: Session
) -> products.Basket:
    q = select(products.Basket).where(products.Basket.id == basket_item_id)
    result = db.scalar(q)
    return result
def delete_basket_item(
    basket_item: products.Basket,
    db: Session
) -> None:
    db.delete(basket_item)
    db.commit()
