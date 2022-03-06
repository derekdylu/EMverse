import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Donut } from 'react-dial-knob'
import Lottie from 'react-lottie-player';
import animationData from './anim.json'
import './commentPage.css'

import { POST_BY_EMOTION,
         EMOTIONS_COUNT }
        from '../graphql';
import { useQuery, useMutation } from '@apollo/client';
import { selectionSetMatchesResult } from '@apollo/client/cache/inmemory/helpers';

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

// const comments = [
//     "haha0",
//     "haha1",
//     "haha2",
//     "haha3",
//     "haha4",
//     "haha5",
//     "haha6",
//     "haha7",
//     "haha8",
//     "haha9"
// ]

export default function CommentPage() {
    const { _emotion } = useParams();
    const [totalComment, setTotalComment] = useState(2);
    const [currentComment, setCurrentComment] = useState("");

    // state variables
    const [play, setPlay] = useState(true);
    const [direction, setDirection] = useState(1);
    const [frameCount, setFrameCount] = useState(1);
    const [loopCount, setLoopCount] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [seek, setSeek] = useState({
        set: false,
        startLoop: 0,
        totalInc: 0
    });
    const [skip, setSkip] = useState(false);

    const style = {
        height: '0%',
        // height: 150,
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)'
    }

    const box = document.getElementById("box");

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
    }, [emotionsCount, _emotion])
    
    function pauseAnim(e) {
        setPlay(false); 

        if ((e.target.className).includes("donut")) {
            setSeek({set: true, startLoop: loopCount});
        }
    }

    function playAnim(e) {
        setPlay(true);
    }

    function enterFrame() {
        setFrameCount(frameCount + 1);

        if (seek.set === true) {
            console.log(seek);
            setSpeed(3);
            setSeek({...seek, set: false, totalInc: (Math.abs(loopCount - seek.startLoop) - 1)});
            if (loopCount < seek.startLoop) {
                setDirection(-1);
            }
            box.style.color = "transparent";
        }

        if (speed === 1) {
            if (frameCount === 40) {
                box.style.color = "black";
                setCurrentComment(posts.postsByEmotion[loopCount].text)
                // setCurrentComment(comments[loopCount]);
            }
            if (frameCount === 230) {
                box.style.color = "transparent";
            }
        }
    }
    
    function loopComplete() {
        if (speed === 3) {
            setSeek({...seek, totalInc: seek.totalInc - 1});

            if (seek.totalInc === 0) {
                setSpeed(1);
                if (direction === -1) {
                    setDirection(1);
                    setSkip(true);
                }
            }
        }
        
        else {
            if (skip) {
                setSkip(false);
            }
            else {
                setLoopCount((loopCount + 1) % (totalComment));
            }
        }

        setFrameCount(0);
    }

    return (
        <div className="fullPage" onMouseDown={(e) => pauseAnim(e)} onMouseUp={(e) => playAnim(e)}>
            {/* {_emotion} */}
            <Lottie
                style={style}
                play={play}
                direction={direction}
                animationData={animationData}
                speed={speed}
                // event
                onEnterFrame={() => enterFrame()}
                onLoopComplete={() => loopComplete()}
            />
            <div className="test">
                <h2 id="box" style={{color: "transparent"}}>{currentComment}</h2>
            </div>
            {/* {frameCount} */}
            {/* {loopCount} */}
            <div className="donut">
                <Donut
                    diameter={200}
                    min={0}
                    max={totalComment - 1}
                    step={1}
                    value={loopCount}
                    theme={{
                        donutColor: 'blue'
                    }}
                    onValueChange={(value) => setLoopCount(value)}
                />
            </div>
        </div>
    )
}