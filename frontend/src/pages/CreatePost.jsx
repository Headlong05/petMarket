import React, {useState} from 'react';
import Input from "../components/ui/input/Input";
import Button from "../components/ui/Button/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { baseURL } from "../config";


const CreatePost = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: undefined,
        content: undefined
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post(baseURL + 'posts/', JSON.stringify(data), config).then(
            function (response) {
                return navigate('/posts')
            }
        )
        console.log(data)
    };

    return (
        <div className={'block'}>
            <form onSubmit={handleSubmit} className={'form-block'}>
                <div className={'form-column'}>

                    <div>
                        <p className={'p-form'}>Заголовок:</p>
                        <Input type='text' required data={data} setData={setData} value={data.title}
                               placeholder={'Заголовок'} name='title'/>
                    </div>

                    <div>
                        <p className={'p-form'}>Текст:</p>
                        <Input type='text' required data={data} setData={setData} value={data.content} placeholder={'Текст'} name='content'/>
                    </div>
                        <Button type="submit" name='Отправить'/>
                </div>

            </form>
        </div>
    );
};

export default CreatePost;