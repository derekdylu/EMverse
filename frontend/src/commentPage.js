import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import animationData from './anim.json'
import './commentPage.css'

export default function CommentPage() {
    const { emotion } = useParams();
    const [play, setPlay] = useState(true);
    const [frameCount, incFrameCount] = useState(1);
    
    function pauseAnim() {
        setPlay(false);          
    }

    function playAnim() {
        setPlay(true);
    }

    function enterFrame() {
        incFrameCount((frameCount + 1));
    }
    
    function loopComplete() {
        console.log(frameCount);
        incFrameCount(0);
    }

    return (
        <div className="fullPage" onMouseDown={pauseAnim} onMouseUp={playAnim}>
            {emotion}
            <Lottie
                loop
                play={play}
                animationData={animationData}
                style={{ width: 150, height: 150 }}
                onEnterFrame={() => enterFrame()}
                onLoopComplete={() => loopComplete()}
            />
            <button>Test</button>
            {frameCount}
        </div>
    )
}