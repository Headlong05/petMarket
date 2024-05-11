import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import { baseURL } from '../config';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(baseURL + 'products/').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const addToBasket = (productId, quantity) => {
    axios.post(`${baseURL}basket`, { product_id: productId, count: quantity });
  };

  return (
    <div className='all-products block'>
      {products.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          photo={product.photo}
          price={product.price}
          product_id={product.id}
          addToBasket={addToBasket}
          baseURL={baseURL}
        />
      ))}
    </div>
  );
};

export default AllProducts;
