import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../config';
import BasketItem from '../components/BasketItem';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
       const response = await axios.get(`${baseURL}basket`);

        setBasketItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBasketItems();
  }, []);

  return (
    <div className="basket">
      <h2>Корзина</h2>
      {basketItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {basketItems.map((item) => (
            <BasketItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Basket;
