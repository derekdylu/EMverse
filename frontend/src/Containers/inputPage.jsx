import './inputPage.css';
import { React, useState } from 'react';
import { CREATE_POST } from '../graphql';
import { useMutation } from '@apollo/client';

const title = '分享你的觀點';
const body = '您的填答內容將會被分享於 EMVerse 的留言牆上，其他人有機會看到您的言論，填答時請避免冒犯他人。請勿提交個人資訊。';
const question = ['在想些什麼呢？', '感覺如何？'];
const addition = '試著選出符合你的意見的情緒表情';

export default function InputPage() {
    const [post, setPost] = useState({ emotion: '', text: '' });
    const [status, setStatus] = useState('');
    const [createPost, { loading, error }] = useMutation(CREATE_POST);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('');

        if (!post.emotion || !post.text.trim()) {
            setStatus('請輸入內容並選擇一個情緒。');
            return;
        }

        try {
            await createPost({
                variables: {
                    emotion: post.emotion,
                    text: post.text.trim(),
                },
            });
            setPost({ emotion: '', text: '' });
            setStatus('已送出，謝謝你的分享。');
        } catch {
            // Apollo exposes the request error below without logging post content.
        }
    };

    function chooseEmotion(event) {
        const previousEmotion = post.emotion;
        const nextEmotion = event.target.className;

        setPost({ ...post, emotion: nextEmotion });

        if (previousEmotion && previousEmotion !== nextEmotion) {
            const previousElement = document.getElementsByClassName(previousEmotion)[0];
            if (previousElement) previousElement.style.border = 'none';
        }
        event.target.style.border = '1px solid black';
    }

    return (
        <div className="fullpage">
            <div className="box">
                <div className="handle">
                    <div className="stick" />
                    <div className="pad title">{title}</div>
                    <div className="pad body">{body}</div>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="pad step">step1</div>
                        <div className="pad question">{question[0]}</div>
                        <textarea
                            className="textInput"
                            maxLength={500}
                            placeholder="留下對議題的看法吧！"
                            required
                            value={post.text}
                            onChange={(event) => setPost({ ...post, text: event.target.value })}
                        />
                        <hr />

                        <div className="pad step">step2</div>
                        <div className="question">{question[1]}</div>
                        <div className="pad addition">{addition}</div>

                        <div className="container">
                            {[
                                ['HAHA', '/haha.gif', '喜悅'],
                                ['SAD', '/sad.gif', '悲傷'],
                                ['DISGUST', '/disgust.gif', '噁心'],
                                ['FEAR', '/fear.gif', '恐懼'],
                                ['ANGRY', '/angry.gif', '憤怒'],
                                ['WOW', '/wow.gif', '驚訝'],
                            ].map(([emotion, source, label]) => (
                                <div className="gif" key={emotion}>
                                    <img
                                        className={emotion}
                                        src={source}
                                        onClick={chooseEmotion}
                                        alt={label}
                                    />
                                    <div className="addition">{label}</div>
                                </div>
                            ))}
                        </div>

                        <input
                            type="submit"
                            className="submit"
                            disabled={loading}
                            value={loading ? '送出中…' : '確認送出'}
                        />
                        {(status || error) && (
                            <p role="status">{error ? '送出失敗，請稍後再試。' : status}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
