import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {baseURL} from "../config";
import Input from "../components/ui/input/Input";
import Button from "../components/ui/Button/Button";

const EditProduct = () => {
    const product_id = useParams().product_id
    const navigate = useNavigate()

    const [data, setData] = useState({
        id: undefined,
        name: undefined,
        description: undefined,
        price: undefined,
        photo: undefined
    })

    useEffect(() => {
        axios.get(baseURL + 'products/' + product_id).then((response) => {
            setData(response.data)
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.patch(baseURL + 'products/' + product_id, JSON.stringify(data), config).then(
            function (response) {
                return navigate('/products')
            }
        )
        console.log(data)
    };

    return (
        <div className={'block'}>
            <form onSubmit={handleSubmit} className={'form-block'}>
                <div className={'form-column'}>

                    <div>
                        <p className={'p-form'}>Название:</p>
                        <Input type='text' required data={data} setData={setData} value={data.name}
                               placeholder={'Название продукта'} name='name'/>
                    </div>

                    <div>
                        <p className={'p-form'}>Описание:</p>
                        <Input type='text' required data={data} setData={setData} value={data.description} placeholder={'Описание продукта'} name='description'/>
                    </div>

                    <div>
                        <p className={'p-form'}>Цена:</p>
                        <Input type='number' required data={data} setData={setData} value={data.price} placeholder={'Цена продукта'} name='price'/>
                    </div>

                    <div>
                        <p className={'p-form'}>Фото:</p>
                        <Input type='text' required data={data} setData={setData} value={data.photo} placeholder={'Ссылка на фото'} name='photo'/>
                    </div>

                    <Button type="submit" name='Отправить'/>
                </div>

            </form>
        </div>
    );
};

export default EditProduct;
