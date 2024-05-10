import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {baseURL} from "../config";
import Input from "../components/ui/input/Input";
import Button from "../components/ui/Button/Button";
const EditPost = () => {
    const post_id=useParams().post_id
    const navigate = useNavigate()

    const [data, setData] = useState({
        id: undefined,
        title: undefined,
        content: undefined
    })

    useEffect(() => {
        axios.get(baseURL + 'posts/'+post_id).then((response) => {
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

        axios.patch(baseURL + 'posts/'+post_id, JSON.stringify(data), config).then(
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

export default EditPost;