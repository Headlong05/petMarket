import React from 'react';

const BasketItem = ({ item }) => {
  return (
    <li className="basket-item">
      <img src={item.productData.photo} alt={item.productData.name} />
      <div>
        <h3>{item.productData.name}</h3>
        <p>Цена: {item.productData.price} $</p>
        <p>Количество: {item.quantity}</p>
        <p>Добавлено: {new Date(item.addedAt).toLocaleString()}</p>
      </div>
    </li>
  );
};


export default BasketItem;
