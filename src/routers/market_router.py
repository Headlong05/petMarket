from typing import List

from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime

from sqlalchemy.orm import Session
from starlette import status

from dependencis import get_db
from schemas import market_schemas
from services import market_services

router = APIRouter(prefix='/products', tags=['products'])


@router.get('/', response_model=List[market_schemas.ViewProduct])
async def api_list_products(
        limit: int = 20,
        offset: int = 0,
        db: Session = Depends(get_db)
):
    list_products = market_services.list_products(
        limit=limit,
        offset=offset,
        db=db
    )
    return list_products


@router.get('/{product_id}', response_model=market_schemas.ViewProduct)
async def api_view_product(
        product_id: int,
        db: Session = Depends(get_db)
):
    product_obj = market_services.get_product(product_id=product_id, db=db)
    if not product_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} does not exist"
        )
    return product_obj


@router.post('/', response_model=market_schemas.ViewProduct)
async def api_create_product(
        product_obj: market_schemas.CreateProduct,
        db: Session = Depends(get_db)
):
    product_instance = market_services.create_product(
        name=product_obj.name, description=product_obj.description,
        price=product_obj.price, photo=product_obj.photo, db=db
    )
    return product_instance


@router.patch('/{product_id}', response_model=market_schemas.ViewProduct)
async def api_patch_product(
        product_id: int,
        product_data: market_schemas.ViewProduct,
        db: Session = Depends(get_db)
):
    product_obj = market_services.get_product(product_id=product_id, db=db)
    if not product_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} does not exist"
        )

    product_updated = market_services.update_product(
        product_obj=product_obj,
        product_data=product_data,
        db=db
    )
    return product_updated


@router.delete('/{product_id}', response_model=market_schemas.AllProduct)
async def api_delete_product(
        product_id: int,
        db: Session = Depends(get_db)
):
    product_obj = market_services.get_product(product_id=product_id, db=db)

    if not product_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} does not exist"
        )

    deleted_product = market_services.delete_product(
        product_obj=product_obj, db=db
    )
    return deleted_product


###



@router.post('/products/basket', response_model=market_schemas.ViewBasketItem)
async def api_create_basket_item(
        basket_item: market_schemas.CreateBasketItem,
        db: Session = Depends(get_db)
):
    basket_instance = market_services.create_basket_item(
        market_id=basket_item.market_id,
        count=basket_item.count,
        db=db
    )
    return basket_instance

@router.get('/products/basket', response_model=List[market_schemas.ViewBasketItem])
async def api_get_basket_items(
        db: Session = Depends(get_db)
):
    basket_items = market_services.get_basket_items(db=db)
    return basket_items


@router.delete('/basket/{basket_item_id}', response_model=market_schemas.ViewBasketItem)
async def api_delete_basket_item(
        basket_item_id: int,
        db: Session = Depends(get_db)
):
    basket_item = market_services.get_basket_item(basket_item_id=basket_item_id, db=db)
    if not basket_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Basket item with id {basket_item_id} does not exist"
        )

    deleted_basket_item = market_services.delete_basket_item(
        basket_item=basket_item,
        db=db
    )
    return deleted_basket_item

