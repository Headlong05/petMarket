import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../config";
import Button from "../components/ui/Button/Button";

const ViewProduct = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: undefined,
        description: undefined,
        price: undefined,
        photo: undefined
    });

    useEffect(() => {
        axios.get(baseURL + 'products/' + product_id).then((response) => {
            setProduct(response.data);
        });
    }, [product_id]);

    const handleDelete = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.delete(baseURL + 'products/' + product_id, config).then(() => {
            navigate('/products');
        });
    };

    if (!product.name) {
        return <div>Loading...</div>;
    }

    return (
    <div className={'block'}>
        <h2>{product.name}</h2>
        <div className="image-container">
            <img src={product.photo} alt={product.name} />
        </div>
        <p>Цена: {product.price} $</p>
        <p>Описание: {product.description}</p>
        <Link to={'/edit-product/' + product_id} className={'headerlink'}>Редактировать</Link>
        <div onClick={handleDelete}>
            <Button name={'Удалить'} />
        </div>
    </div>
);

};

export default ViewProduct;
