import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Post = ({title, content, post_id, link}) => {
    const navigate = useNavigate()

    return (
        <div className="post">

            {
            link ?
                <Link to={'/post/'+post_id} className={'header-link'}>{title}</Link>
                :
                <h1>{title}</h1>
            }
            <h1>{title}</h1>
            <hr/>
            <p>{content}</p>
        </div>
    );
};

export default Post;