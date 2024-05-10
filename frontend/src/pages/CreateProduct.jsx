import React, {useState} from 'react';
import Input from "../components/ui/input/Input";
import Button from "../components/ui/Button/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { baseURL } from "../config";

const CreateProduct = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: undefined,
        description: undefined,
        price: undefined,
        photo: undefined
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post(baseURL + 'products/', JSON.stringify(data), config).then(
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
                        <Input type='text' required data={data} setData={setData} value={data.photo} placeholder={'Ссылка на фото продукта'} name='photo'/>
                    </div>

                    <Button type="submit" name='Отправить'/>
                </div>

            </form>
        </div>
    );
};

export default CreateProduct;
