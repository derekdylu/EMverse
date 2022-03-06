import './InputPage.css';
import { React, useState, useEffect } from 'react';

import { CREATE_POST,
         UPDATE_POST }
       from './graphql';
import { useMutation } from '@apollo/client';

export default function InputPage() {
    const [post, setPost] = useState({emotion: "", text: ""});
    const [createPost] = useMutation(CREATE_POST);

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(post);
        try {
            await createPost({ variables: post });
        }
        catch(e)
        {
            console.log(e);
        }
    }

    return (
        <form className="box" onSubmit={handleSubmit}>
            Text<br/>
            <input type="text" /*value={post.text}*/ onChange={(e) => setPost({...post, text: e.target.value})}></input><br/><br/>
            Emotion <br/>
            <label><input type="radio" name="emotion" value="HAHA" onChange={(e) => setPost({...post, emotion: e.target.value})} />
            haha</label>
            <label><input type="radio" name="emotion" value="ANGRY" onChange={(e) => setPost({...post, emotion: e.target.value})} />
            angry</label>
            <label><input type="radio" name="emotion" value="SAD" onChange={(e) => setPost({...post, emotion: e.target.value})} />
            sad</label>
            <label><input type="radio" name="emotion" value="WOW" onChange={(e) => setPost({...post, emotion: e.target.value})} />
            wow</label>
            <label><input type="radio" name="emotion" value="FEAR" onChange={(e) => setPost({...post, emotion: e.target.value})} />
            fear</label>
            <label><input type="radio" name="emotion" value="DISGUST" onChange={(e) => setPost({...post, emotion: e.target.value})} />
            disgust</label><br/><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}