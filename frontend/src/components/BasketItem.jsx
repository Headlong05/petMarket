import React from 'react';

const BasketItem = ({ item }) => {
  const { product_data, count, date } = item;

  return (
      <li className="basket-item">
        {product_data ? (
            <>
              <img src={product_data.photo} alt={product_data.name}/>
              <div>
                <h3>{product_data.name}</h3>
                <p>Цена: {product_data.price} $</p>
                <p>Количество: {count}</p>
                <p>Добавлено: {new Date(date).toLocaleString()}</p>
              </div>
            </>
        ) : (
            <div>Данные о продукте не доступны</div>
        )}
      </li>

  );
};

export default BasketItem;
