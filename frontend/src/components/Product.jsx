import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = ({ name, photo, price, product_id, baseURL }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToBasket = async () => {
    try {
      await axios.post(`${baseURL}basket`, {
        market_id: product_id,
        count: quantity,
      });
      alert('Товар добавлен в корзину');
    } catch (error) {
      console.error(error);
      alert('Ошибка при добавлении товара в корзину');
    }
  };

  return (
    <div className="product-item">
      <img src={photo} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Цена: {price} $</p>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button onClick={handleAddToBasket}>Добавить в корзину</button>
        <hr/>
        <Link to={`/products/${product_id}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default Product;
