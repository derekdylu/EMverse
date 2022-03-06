import './inputPage.css';
import { React, useState, useEffect } from 'react';

import { CREATE_POST,
         UPDATE_POST }
       from '../graphql';
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
            <h2>分享你的觀點</h2>
            <h4>
            您的填答內容將會被分享於EMVerse的留言牆上，其他人有機會看到您的言論，填答時請避免冒犯他人。我們不會透露您的個人資訊，請放心填答。
            </h4>
            <hr />

            <h4>step1</h4>
            <h3>在想些什麼呢？</h3>
            <input type="text" className="textInput" placeholder="留下對議題的看法吧！" onChange={(e) => setPost({...post, text: e.target.value})}></input>
            <hr />

            <h4>step2</h4>
            <h3>感覺如何？</h3>
            <h4 style={{fontWeight: "bold"}}>試著選出符合你的意見的情緒表情</h4>
            {/* <label>
            <input type="radio" name="test" value="small" checked />
            <img src="../haha.gif" />
            </label> */}

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
            <input type="submit" className="submit" value="確認送出" />
        </form>
    )
}