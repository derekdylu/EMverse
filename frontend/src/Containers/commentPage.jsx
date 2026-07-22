import { React, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Donut } from 'react-dial-knob';
import { useQuery } from '@apollo/client';
import LottiePlayer from '../Components/LottiePlayer';
import { POST_BY_EMOTION } from '../graphql';
import animationData from './happy.json';
import homeButton from './home_button.png';
import './commentPage.css';

export default function CommentPage() {
    const { _emotion } = useParams();
    const commentRef = useRef(null);
    const [currentComment, setCurrentComment] = useState('');
    const [direction, setDirection] = useState(1);
    const [frameCount, setFrameCount] = useState(1);
    const [loopCount, setLoopCount] = useState(0);
    const [play, setPlay] = useState(true);
    const [seek, setSeek] = useState({ set: false, startLoop: 0, totalInc: 0 });
    const [skip, setSkip] = useState(false);
    const [speed, setSpeed] = useState(1);

    const { data, error, loading } = useQuery(POST_BY_EMOTION, {
        variables: { emotion: _emotion },
    });
    const comments = data?.postsByEmotion || [];
    const totalComments = comments.length;

    useEffect(() => {
        setLoopCount(0);
        setCurrentComment(comments[0]?.text || '目前還沒有留言。');
    }, [data]);

    function pauseAnimation(event) {
        setPlay(false);
        if (String(event.target.className).includes('donut')) {
            setSeek({ set: true, startLoop: loopCount, totalInc: 0 });
        }
    }

    function enterFrame() {
        if (totalComments === 0) return;
        setFrameCount((current) => current + 1);

        if (seek.set) {
            setSpeed(3);
            setSeek({
                set: false,
                startLoop: seek.startLoop,
                totalInc: Math.max(Math.abs(loopCount - seek.startLoop) - 1, 0),
            });
            if (loopCount < seek.startLoop) setDirection(-1);
            if (commentRef.current) commentRef.current.style.color = 'transparent';
        }

        if (speed === 1) {
            if (frameCount === 15 || frameCount === 90) {
                if (commentRef.current) commentRef.current.style.color = 'white';
                setCurrentComment(comments[loopCount]?.text || '');
            }
            if (frameCount === 65 || frameCount === 140) {
                if (commentRef.current) commentRef.current.style.color = 'transparent';
            }
            if (frameCount === 80) {
                setLoopCount((loopCount + 1) % totalComments);
            }
        }
    }

    function loopComplete() {
        if (totalComments === 0) return;

        if (speed === 3) {
            setSeek({ ...seek, totalInc: seek.totalInc - 1 });
            if (seek.totalInc <= 0) {
                setSpeed(1);
                if (direction === -1) {
                    setDirection(1);
                    setSkip(true);
                }
            }
        } else if (skip) {
            setSkip(false);
        } else {
            setLoopCount((loopCount + 1) % totalComments);
        }

        setFrameCount(0);
    }

    const style = {
        height: '95%',
        width: '150%',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0%)',
    };

    return (
        <div
            className="fullPage"
            onMouseDown={pauseAnimation}
            onMouseUp={() => setPlay(true)}
        >
            <LottiePlayer
                style={style}
                play={play}
                direction={direction}
                animationData={animationData}
                speed={speed}
                onEnterFrame={enterFrame}
                onLoopComplete={loopComplete}
            />
            <div className="test">
                <p ref={commentRef} style={{ color: 'transparent' }}>
                    {loading ? '載入中…' : error ? '無法載入留言。' : currentComment}
                </p>
            </div>
            {totalComments > 1 && (
                <div className="donut">
                    <Donut
                        diameter={100}
                        min={0}
                        max={totalComments - 1}
                        step={1}
                        value={loopCount}
                        theme={{
                            donutColor: 'white',
                            donutThickness: 10,
                            centerFocusedColor: '#FB5544',
                            centerColor: '#FB5544',
                            bgrColor: '#FF998F',
                            maxedBgrColor: '#FF998F',
                        }}
                        onValueChange={(value) => setLoopCount(Number(value))}
                    />
                </div>
            )}
            <Link to="/home">
                <button className="home_button" type="button">
                    <img src={homeButton} alt="回到首頁" />
                </button>
            </Link>
        </div>
    );
}
