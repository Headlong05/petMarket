import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {baseURL} from "../config";
import Post from "../components/Post";
import Button from "../components/ui/Button/Button";

const ViewPost = () => {
    const post_id=useParams().post_id
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: undefined,
        content: undefined
    })

    useEffect(() => {
        axios.get(baseURL + 'posts/' + post_id).then((response) => {
            setData(response.data)
        })
    }, [])

    const handleSubmit = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.delete(baseURL + 'posts/'+post_id, config).then(
            function (response) {
                return navigate('/posts')
            }
        )
        console.log(data)
    };

    return (
        <div className={'block'}>
            <Post title={data.title} content={data.content}/>
            <Link to={'/edit-post/' + post_id} className={'headerlink'}>Редактировать</Link>
            <div onClick={()=> handleSubmit()}>
                <Button name={'Удалить'}/>
            </div>
        </div>
    );
};

export default ViewPost;