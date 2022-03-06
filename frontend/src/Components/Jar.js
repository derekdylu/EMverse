import { React, useRef, useState, useEffect } from 'react'
import Sketch from 'react-p5'
import { 
    Mouse, 
    Engine, 
    Render, 
    Bodies, 
    World, 
    Runner, 
    MouseConstraint, 
    Body, 
    Events,
} from 'matter-js';

// TODO: mount matters
// TODO: mount P5
// TODO: scale
// TODO: bounce and breath
// TODO: transition
// TODO: UI finish

const Jar = ({ emotionsCount }) => {
    let counts = [];
    if(emotionsCount !== undefined){
        counts = emotionsCount.emotionsCount;
        console.log(counts);
    }

    //DIV: Matter part
    const scene = useRef();
    const engine = useRef(Engine.create());
    let mouseConstraint;
    const circles = [];
    const walls = [];

    let haha;
    let sad, angry, disgust, fear, wow;
    
    useEffect (() => {
        
        // CHECK here for window size code, cw? ch?
        let { innerWidth: cw, innerHeight: ch } = window;
        // cw = cw*widthRatio;
        // ch = ch*heightRatio;
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

        // NOTE mouse constraint
        const mouse = Mouse.create(render.canvas.elt);
        const options = {
            mouse: mouse,
            constraint: {
                // stiffness: 0.5,
                // render: {visible: false}
            }
        };
        mouseConstraint = MouseConstraint.create(engine.current, options);
        render.mouse = mouse;
        World.add(engine.current.world, mouseConstraint);

        // CHECK gravity?
        // engine.current.gravity.scale = 0.001;
        // engine.current.gravity.y = 0.1;

        // NOTE Boundaries (WALL)
        let ground = Bodies.rectangle(cw/2, ch+30, cw, 60, {
            isStatic: true
        });
        walls.push(ground);
        let left = Bodies.rectangle(250, ch/2, 500, ch, {
            isStatic: true
        });
        walls.push(left);
        let right = Bodies.rectangle(cw-30, ch/2, 100, ch, {
            isStatic: true
        });
        walls.push(right);
        let ceil = Bodies.rectangle(cw/2, 0, cw, 180, {
            isStatic: true
        });
        walls.push(ceil);
        World.add(engine.current.world, walls);

        // NOTE generate circles
        const sumCounts = counts.reduce(
            (a, b) => a + b, 0
        );
        // const logSumCounts = Math.log10(sumCounts);
        // const scale = Math.pow(100/sumCounts, 1/Math.E);
        const scale = 600;

        generateCircle("haha", (counts[0] === 0) ? 1 : (counts[0] / sumCounts * scale), cw*2/3, ch/2);
        generateCircle("angry", (counts[1] === 0) ? 1 : (counts[1] / sumCounts * scale), cw*2/3, ch/2);
        generateCircle("sad", (counts[2] === 0) ? 1 : (counts[2] / sumCounts * scale), cw*2/3, ch/2);
        generateCircle("wow", (counts[3] === 0) ? 1 : (counts[3] / sumCounts * scale), cw*2/3, ch/2);
        generateCircle("fear", (counts[4] === 0) ? 1 : (counts[4] / sumCounts * scale), cw*2/3, ch/2);
        generateCircle("disgust", (counts[5] === 0) ? 1 : (counts[5] / sumCounts * scale), cw*2/3, ch/2);

        World.add(engine.current.world, circles);

        // CHECK what is this?
        const runner = Runner.create({
            isFixed: true
        });
        Runner.run(runner, engine.current)

        // Render.lookAt(render, {
        //     min: { x: 0, y: 0 },
        //     max: { x: cw, y: ch }
        // });
        // Render.run(render)

        //  The returned function will be called when the element unmount
        // return () => {
        //     Render.stop(render);
        //     World.clear(engine.current.world);
        //     Engine.clear(engine.current);
        //     render.canvas.remove();
        //     render.canvas = null;
        //     render.context = null;
        //     render.textures = {};
        // }
    }, []);

    //DIV: P5 part    

    const setup = (p5, canvasParentRef) => {
        p5.frameRate(60);
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(100);

        // BUG can't load pubic image ???
        haha = p5.createImg("../haha.gif");
        angry = p5.createImg("../angry.gif");
        sad = p5.createImg("../sad.gif");
        wow = p5.createImg("../wow.gif");
        fear = p5.createImg("../cheer_up.gif");
        disgust = p5.createImg("../thinking.gif");

    }
    
    const generateCircle = (emotion, sz, ww, wh) => {
        let cir = Bodies.circle(ww, wh, sz || 80, {restitution: 0.2});
        cir.emotion = emotion;
        cir.sz = sz;
        circles.push(cir);
        console.log(cir);
    }
      
    const draw = (p5) => {
        p5.background(255);

        // NOTE go outside will back
        // elements.forEach(function (ele, i) {
        // 	if (ele.position.x > width || ele.position.x < 0 || ele.position.y < 0 || ele.position.y > height) {
        // 		let tmpEmo = ele.emotion;
        // 		let tmpSize = ele.size;
        // 		elements.splice(i, 1);
        // 		generateCircle(tmpEmo, tmpSize);
        // 	}
        // })

        p5.noStroke();
        for(let ele of walls){
            p5.beginShape();
            p5.fill("#FFCB4C");

            for(let vert of ele.vertices){
                p5.vertex(vert.x, vert.y);
            }
            p5.endShape();
        }

        // TODO ele -> walls
        for(let ele of circles) {

            p5.beginShape();
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

        // CHECK change to relative position
        p5.push();
            p5.fill(0, 0);
            p5.strokeWeight(7.5);
            p5.stroke("#FFB500");
            p5.rect(-140, -380, 600, 600, 50);
            p5.rect(1395, 350, 600, 600, 50);
            
            p5.fill("#FFB500");
            p5.noStroke();
            p5.rect(-140, 250, 600, 600, 50);
            p5.rect(500, -530, 860, 600, 50);
            p5.rect(1395, -275, 600, 600, 50);

            p5.fill("#523915")
            p5.textSize(20);
            p5.text('今日議題', 48, 325);
            p5.textSize(36);
            p5.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit mumbule text wrap no chinese?', 65, 345, 410);

            p5.stroke("#FFCB4C");
            p5.line(50, 350, 50, 600);

            p5.noStroke();
            p5.fill(255, 80);
            p5.rect(p5.map(p5.mouseX, 0, 1440, 500, 1270), 90, 100, 860);
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
    
    // function easeOutBounce(x) {
    //     const n1 = 7.5625;
    //     const d1 = 2.75;
        
    //     if (x < 1 / d1) {
    //         return n1 * x * x;
    //     } else if (x < 2 / d1) {
    //         return n1 * (x -= 1.5 / d1) * x + 0.75;
    //     } else if (x < 2.5 / d1) {
    //         return n1 * (x -= 2.25 / d1) * x + 0.9375;
    //     } else {
    //         return n1 * (x -= 2.625 / d1) * x + 0.984375;
    //     }
    // }

    
      
    return <Sketch setup={setup} draw={draw} />
}

export default Jar