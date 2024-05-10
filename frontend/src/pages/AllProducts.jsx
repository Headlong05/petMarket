import React, { useEffect, useState } from 'react';
import axios from "axios";
import Product from "../components/Product";

import { baseURL } from "../config";

const AllProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(baseURL + 'products/').then((response) => {
            setProducts(response.data)
        })
    }, [])

    return (
        <div className='all-products block' >
            {
                products.map(product => <Product name={product.name}
                                                 photo={product.photo}
                                                 price={product.price}
                                                 key={product.id}
                                                 product_id={product.id}
                />)
            }
        </div>
    );
};

export default AllProducts;
