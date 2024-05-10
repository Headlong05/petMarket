import React from 'react';
import { Link } from 'react-router-dom';


const Product = ({ name, photo, price, product_id }) => {
  return (
    <div className="product-item">
      <img src={photo} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Цена: {price} $</p>
        <Link to={`/products/${product_id}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default Product;
