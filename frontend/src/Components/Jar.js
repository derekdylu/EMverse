import { React, useRef, useState, useEffect, } from 'react'
import Sketch from 'react-p5'
import { Mouse, Engine, Render, Bodies, World, Runner, MouseConstraint, Body, } from 'matter-js';
const emotionsList = "haha-angry-sad-wow-fear-disgust".split("-");

// DONE: mount matters and P5
// DONE: RWD UI
// DONE: outline
// DONE: breath
// TODO: Button
// TODO: router and transition animation
// BUG: outline not full
// BUG: assets

const Jar = ({ emotionsCount }) => {
    const [menu, setMenu] = useState(false);

    const handleMenu = () => {
        // console.log("handlemenu");
        setMenu(true);
    }

    let counts = [];
    let minIdx = -1;
    if(emotionsCount !== undefined){
        counts = emotionsCount.emotionsCount;
        console.log(counts);

        let min;
        for (let i = 0; i < counts.length; i++){
            if (min === undefined || counts[i] < min){
                min = counts[i];
                minIdx = i;
            }
        }
        console.log(emotionsList[minIdx]);
    }

    const scene = useRef();
    const engine = useRef(Engine.create());
    let mouseConstraint;
    const circles = [];
    const walls = [];

    let haha, sad, angry, disgust, fear, wow;
    let { innerWidth: cw, innerHeight: ch } = window;

    let cnv;
    let mx, my;
    let sec = 0;
    let openMenu;
    
    useEffect (() => {
        
        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                background: 'transparent',
                wireframes: false
            }
        });

        // mouse constraint
        const mouse = Mouse.create(render.canvas.elt);
        const options = {
            mouse: mouse,
        };
        mouseConstraint = MouseConstraint.create(engine.current, options);
        render.mouse = mouse;
        World.add(engine.current.world, mouseConstraint);

        // boundaries (WALL)
        let ground = Bodies.rectangle(cw/2, ch+30, cw, 60, {
            isStatic: true
        });
        walls.push(ground);
        let left = Bodies.rectangle(0.2678*cw/2, ch/2, 0.2678*cw, ch, {
            isStatic: true
        });
        walls.push(left);
        let right = Bodies.rectangle(cw-(0.0567*cw/2), ch/2, 0.0567*cw, ch, {
            isStatic: true
        });
        walls.push(right);
        let ceil = Bodies.rectangle(cw/2, 0.1656*ch/2, cw, 0.1656*ch, {
            isStatic: true
        });
        walls.push(ceil);
        World.add(engine.current.world, walls);

        // generate circles
        const sumCounts = counts.reduce(
            (a, b) => a + b, 0
        );
        
        const scale = 600 * ((cw-1440)/1440+1);

        for (let i = 0; i < 6; i++) {
            generateCircle(emotionsList[i], (counts[i] === 0) ? 1 : (counts[i] / sumCounts * scale), cw*2/3, ch/2);
        }

        World.add(engine.current.world, circles);

        const runner = Runner.create({
            isFixed: true
        });
        Runner.run(runner, engine.current)

    }, []);

    const setup = (p5) => {
        p5.frameRate(30);
        cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(100);
        cnv.mouseClicked(mouseHasClicked);

        haha = p5.createImg("../haha.gif");
        angry = p5.createImg("../angry.gif");
        sad = p5.createImg("../sad.gif");
        wow = p5.createImg("../wow.gif");
        fear = p5.createImg("../fear.gif");
        disgust = p5.createImg("../disgust.gif");

    }
    
    const generateCircle = (emotion, sz, ww, wh) => {
        let cir = Bodies.circle(ww, wh, sz || 80, { restitution: 0.3 });
        cir.emotion = emotion;
        cir.sz = sz;
        cir.clicked = false;
        circles.push(cir);
        console.log(cir);
    }
      
    const draw = (p5) => {
        p5.background(255);
        mx = p5.mouseX;
        my = p5.mouseY;

        p5.noStroke();
        for(let ele of walls){
            p5.beginShape();
            p5.fill("#FFCB4C");

            for(let vert of ele.vertices){
                p5.vertex(vert.x, vert.y);
            }
            p5.endShape();
        }

        // call breath animation
        sec === 60 ? sec = 0 : sec++;
        if (sec < 30){
            Body.scale(circles[minIdx], 1.004, 1.004);
        } else {
            Body.scale(circles[minIdx], 0.996, 0.996);
        }
        

        for(let ele of circles) {

            p5.beginShape();
            if (ele.clicked){
                p5.stroke("#FFB500");
                p5.strokeWeight(3.5);
            } else {
                p5.noStroke();
            }

            // if (ele.clicked){
            //     p5.push();
            //     p5.fill(emotionColor(ele.emotion) || 255);
            //     for(let vert of ele.vertices){
            //         p5.vertex(vert.x, vert.y);
            //     }
            //     p5.filter(p5.BLUR, 6)
            //     p5.pop();
            // }

            p5.fill(emotionColor(ele.emotion) || 255);
            for(let vert of ele.vertices){
                p5.vertex(vert.x, vert.y);
            }

            p5.fill(emotionColor(ele.emotion) || 255);
            for(let vert of ele.vertices){
                p5.vertex(vert.x, vert.y);
            }
            p5.endShape();

            //draw face by emotions
            switch (ele.emotion){
                case 'haha':
                    haha.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    haha.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                    break;
                case 'angry':
                    angry.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    angry.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                    break;
                case 'sad':
                    sad.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    sad.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                    break;
                case 'wow':
                    wow.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    wow.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                    break;
                case 'fear':
                    fear.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    fear.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                    break;
                case 'disgust':
                    disgust.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    disgust.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                    break;
            }
        }

        // DONE change to relative position
        p5.push();
        
            p5.fill(0, 0);
            p5.strokeWeight(7.5);
            p5.stroke("#FFB500");
            p5.rect(-0.2375*cw, -0.3912*ch, 2*0.2375*cw, 2*0.3912*ch, 50);
            p5.rect(0.9646*cw, 0.4145*ch, 2*0.0347*cw, 2*0.5854*ch, 50);
            
            p5.fill("#FFB500");
            p5.noStroke();
            p5.rect(-0.2375*cw, 0.4145*ch, 2*0.2375*cw, 2*0.5854*ch, 50);
            p5.rect(0.2678*cw, -0.1369*ch, 0.6755*cw, 2*0.1369*ch, 50);
            p5.rect(0.9646*cw, -0.3760*ch, 2*0.0347*cw, 2*0.3760*ch, 50);
            p5.fill("#ffffff");
            openMenu = p5.rect(0.0245*cw, 0.8827*ch, 0.1853*cw, 0.0662*ch, 50);

            p5.stroke("#FFCB4C");
            p5.line(0.0217*cw, 0.5122*ch, 0.0217*cw, 0.7857*ch);

            p5.noStroke();
            p5.fill("#523915")
            p5.textSize(20);
            p5.text('Today\'s Topic', 0.0217*cw - 5, 0.5122*ch - 20);
            p5.fill("#FFB500")
            p5.text('Double click to see comments', 0.5301*cw, 0.2023*ch);
            p5.fill("#523915")
            p5.textSize(36);
            p5.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit?', 0.0217*cw + 15, 0.5122*ch-10, 0.2118*cw);

        p5.pop();
    }

    const emotionColor = (emotion) => {
        switch (emotion){
            case 'haha':
                return "#FFDE32";
            case 'angry':
                return "#EF5454";
            case 'sad':
                return "#4D66F2";
            case 'wow':
                return "#41D7A1";
            case 'fear':
                return "#A67CC3";
            case 'disgust':
                return "#318859";
        }
    }

    const clearClicked = (ele) => {
        console.log("clear all")
        if (ele){
            ele.clicked = false;
        } else {
            for (let ele of circles) {
                ele.clicked = false;
            }
        }
    }

    const clearClickedTimer = async (ele) => {
        console.log("timer start");
        setTimeout(clearClicked(ele), 5000);
    }

    const mouseHasClicked = () => {
        let outsideClicked = true;

        // if (Math.hypot(mx - ele.position.x, my - ele.position.y) < ele.circleRadius)

        for (let ele of circles){
            if (Math.hypot(mx - ele.position.x, my - ele.position.y) < ele.circleRadius){
                outsideClicked = false;
                // clearClickedTimer(ele);
                if (ele.clicked === true){
                    console.log(ele.emotion, " double clicked!")
                }else{
                    console.log(ele.emotion, " clicked")
                    clearClicked()
                    ele.clicked = true;
                }
            }
        }
        
        if (outsideClicked){
            clearClicked();
        }
    }
      
    return <Sketch setup={setup} draw={draw} />
}

export default Jar