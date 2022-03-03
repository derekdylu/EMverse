import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Donut } from 'react-dial-knob'
import Lottie from 'react-lottie-player';
import animationData from './anim.json'
import './commentPage.css'

import { POST_BY_EMOTION,
         EMOTIONS_COUNT }
        from './graphql';
import { useQuery, useMutation } from '@apollo/client';

/*
    TODO:
    [DONE] click anywhere except knob to play/pause
    [] current idea: while (choose comment) -> pause, after -> direction(-1), speed(>1) to frame 0 -> play
    [] connect BE database
    [] load comment if database has new update
    [] (probably) add loading animation while loading data
    [] (probably) update window size if resize
*/

const emotionToIdx = {
    "HAHA": 0,
    "ANGRY": 1,
    "SAD": 2,
    "WOW": 3,
    "FEAR": 4,
    "DISGUST": 5,
}

export default function CommentPage() {
    const { _emotion } = useParams();
    const [totalComment, setTotalComment] = useState(2);
    const [currentComment, setCurrentComment] = useState("");

    // state variables
    const [play, setPlay] = useState(true);
    const [frameCount, setFrameCount] = useState(1);
    const [loopCount, setLoopCount] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [seek, setSeek] = useState(false);

    const style = {
        width: 150,
        height: 150,
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)'
    }

    // database data
    const { data: posts } = useQuery(POST_BY_EMOTION, {
        variables: { emotion: _emotion }
    })

    useEffect (() => {
        if (posts !== undefined) {
            console.log(posts.postsByEmotion[0].text);
            setTotalComment(posts.postsByEmotion.length);
        }
    }, [posts]);

    const { data: emotionsCount } = useQuery(EMOTIONS_COUNT);

    useEffect (() => {
        if (emotionsCount !== undefined) {
            console.log(emotionsCount.emotionsCount);
            console.log(typeof(_emotion));
    }
    }, [emotionsCount])
    
    function pauseAnim(e) {
        if (!(e.target.className).includes("donut")) {
            setPlay(false);          
        } else {
            setPlay(false);        
            setSeek(true);
        }
    }

    function playAnim(e) {
        setPlay(true);
    }

    function enterFrame() {
        setFrameCount(frameCount + 1);
        if (seek === true) {
            setSpeed(2);
            setSeek(false);
        }
    }
    
    function loopComplete() {
        if (speed === 2) {
            setSpeed(1);
        }
        else {
            setLoopCount((loopCount + 1) % (totalComment));
        }

        console.log(frameCount);
        setFrameCount(0);
    }

    useEffect(() => {
        const box = document.getElementById("box");

        if (speed === 2) {
            box.style.color = "transparent";
        }
        else {
            if (frameCount === 40) {
                box.style.color = "black";
                setCurrentComment(posts.postsByEmotion[loopCount].text)
            }
            if (frameCount === 230) {
                box.style.color = "transparent";
            }
        }
    });

    return (
        <div className="fullPage" onMouseDown={(e) => pauseAnim(e)} onMouseUp={(e) => playAnim(e)}>
            {_emotion}
            <Lottie
                style={style}
                loop
                play={play}
                animationData={animationData}
                speed={speed}
                // event
                onEnterFrame={() => enterFrame()}
                onLoopComplete={() => loopComplete()}
            />
            {/* {frameCount} */}
            {/* {loopCount} */}
            <Donut
                diameter={200}
                min={0}
                max={totalComment - 1   }
                step={1}
                value={loopCount}
                theme={{
                    donutColor: 'blue'
                }}
                onValueChange={(value) => setLoopCount(value)}
            />
            <h2 id="box" style={{color: "transparent"}}>{currentComment}</h2>
        </div>
    )
}