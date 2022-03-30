import './inputPage.css';
import { React, useState, useEffect } from 'react';
import ReactFreezeframe from 'react-freezeframe';
import Dragabble from 'react-draggable';

import { CREATE_POST,
         UPDATE_POST }
       from '../graphql';
import { useMutation } from '@apollo/client';

const title = "分享你的觀點";
const body = "您的填答內容將會被分享於EMVerse的留言牆上，其他人有機會看到您的言論，填答時請避免冒犯他人。我們不會透露您的個人資訊，請放心填答。";
const question = [
    "在想些什麼呢？",
    "感覺如何？"
];
const addition = "試著選出符合你的意見的情緒表情";
/*
    TODO:
    [ ] change pointer on submit btn hover
    [ ] reset page style on submit btn clicked
    [ ] edit drag bar
    [ ] line spacing, don't center text (when did everything goes wrong)
    [ ] emotion subtitle, center emotion vertically (s.t. other gif size is not effected by chosen gif)
    [ ] different page on desktop and mobile (hm?)
    [ ] pull up page
    [ ] must beautify code :")
*/

export default function InputPage() {
    const [post, setPost] = useState({emotion: "", text: ""});
    const [createPost] = useMutation(CREATE_POST);

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log(post);
        // try {
        //     await createPost({ variables: post });
        // }
        // catch(e)
        // {
        //     console.log(e);
        // }
    }

    function chooseEmotion(e) {
        let prev = post.emotion;

        setPost({...post, emotion: e.target.className});

        if (prev === e.target.className) {
            if (e.target.style.border === "none") {
                e.target.style.border = "1px solid black";
            }
            else {
                e.target.style.border = "none";
            }
        }
        else if (prev !== "") {
            let prevCSS = document.getElementsByClassName(prev)[0];

            prevCSS.style.border = "none";
            e.target.style.border = "1px solid black";
        }
        else {
            e.target.style.border = "1px solid black";
        }

    }

    return (
        <div className="fullpage">
        {/* <Dragabble axis="y" handle=".handle"> */}
            <div className="box">
            <div className="handle">
                <div className="stick" />
                <div className="pad title">{title}</div>
                <div className="pad body">{body}</div>
                {/* <hr /> */}
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="pad step">step1</div>
                    <div className="pad question">{question[0]}</div>
                    <textarea className="textInput" placeholder="留下對議題的看法吧！" onChange={(e) => setPost({...post, text: e.target.value})} />
                    <hr />

                    <div className="pad step">step2</div>
                    <div className="question">{question[1]}</div>
                    <div className="pad addition">{addition}</div>

                    <div className="container">
                        <div className="gif">
                            <img className="HAHA" src="../haha.gif" onClick={(e) => chooseEmotion(e)} alt=""/>
                            <div className="addition">喜悅</div>
                        </div>
                        <div className="gif">
                            <img className="SAD" src="../sad.gif" onClick={(e) => chooseEmotion(e)} alt=""/>
                            <div className="addition">悲傷</div>
                        </div>
                        <div className="gif">
                            <img className="DISGUST" src="../cheer_up.gif" onClick={(e) => chooseEmotion(e)} alt=""/>
                            <div className="addition">噁心</div>
                        </div>
                        <div className="gif">
                            <img className="FEAR" src="../thinking.gif" onClick={(e) => chooseEmotion(e)} alt=""/>
                            <div className="addition">恐懼</div>
                        </div>
                        <div className="gif">
                            <img className="ANGRY" src="../angry.gif" onClick={(e) => chooseEmotion(e)} alt=""/>
                            <div className="addition">憤怒</div>
                        </div>
                        <div className="gif">
                            <img className="WOW" src="../wow.gif" onClick={(e) => chooseEmotion(e)} alt=""/>
                            <div className="addition">驚訝</div>
                        </div>
                    </div>

                    <input type="submit" className="submit" value="確認送出" />
                </form>
            </div>
            </div>
        {/* </Dragabble> */}
        </div>
    )
}