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

const Home = () => {

    //DIV: Matter part
    let mousePosition = {x: 0, y: 0};
    const scene = useRef();
    // useNavigate CHECK
    const engine = useRef(Engine.create());
    const clickedObject = useRef(null); // CHECK
    const circles = [];
    const walls = [];
    let mouseConstraint;

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
        let ground = Bodies.rectangle(cw/2, ch, cw, 60, {
            isStatic: true
        });
        walls.push(ground);
        let left = Bodies.rectangle(0, ch/2, 60, ch, {
            isStatic: true
        });
        walls.push(left);
        let right = Bodies.rectangle(cw, ch/2, 60, ch, {
            isStatic: true
        });
        walls.push(right);
        let ceil = Bodies.rectangle(cw/2, 0, cw, 60, {
            isStatic: true
        });
        walls.push(ceil);
        World.add(engine.current.world, walls);

        // NOTE generate circles
        generateCircle("haha", 100);
        generateCircle("sad", 150);
        generateCircle("angry", 45);
        generateCircle("wow", 80);
        generateCircle("disgust", 90);
        generateCircle("fear", 90);

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
    // const preload = (p5) => {
    //     let haha = p5.createImg("../../public/haha.gif");
    //     let sad = p5.createImg("../../public/sad.gif");
    //     let angry = p5.createImg("../../public/angry.gif");
    //     let wow = p5.createImg("../../public/wow.gif");
    //     let disgust = p5.createImg("../../public/thinking.gif");
    //     let fear = p5.createImg("../../public/cheer_up.gif");
    // }

    const setup = (p5, canvasParentRef) => {
        p5.frameRate(60);
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.background(100);
        // let {Engine, Bodies, World, Mouse, MouseConstraint} = Matter;
        // engine = Engine.create();

        // generateOutline();

        // generateCircle("haha", 200);
        // generateCircle("sad", 150);
        // generateCircle("angry", 45);
        // generateCircle("wow", 80);
        // generateCircle("thinking", 90);
        // generateCircle("cheer_up", 90);

        // var mouse = Mouse.create(canvas.elt);
        // mouseConstraint = MouseConstraint.create(engine,{
        //     mouse: mouse
        // })
        // World.add(engine.world, mouseConstraint);
        
        // World.add(engine.world, elements);
        // Engine.run(engine);
    }

    // function generateOutline() {
    //     // let {Engine, Bodies, World} = Matter;
    //     let ground = Bodies.rectangle(width/2, height, width, 60, {
    //         isStatic: true
    //     });
    //     elements.push(ground);
    
    //     let left = Bodies.rectangle(0, height/2, 60, height, {
    //         isStatic: true
    //     });
    //     elements.push(left);
    
    //     let right = Bodies.rectangle(width, height/2, 60, height, {
    //         isStatic: true
    //     });
    //     elements.push(right);
    
    //     let ceil = Bodies.rectangle(width/2, 0, width, 60, {
    //         isStatic: true
    //     });
    //     elements.push(ceil);
    // }
    
    const generateCircle = (emotion, cnt) => {
        // let {Engine, Bodies, World} = Matter;
        let cir = Bodies.circle(400, 200, cnt || 80, {restitution: 0.2});
        cir.emotion = emotion;
        cir.cnt = cnt;
        circles.push(cir);
        console.log(cir);
    }
      
    const draw = (p5) => {

        // let haha = p5.createImg("../../public/haha.gif");
        // let sad = p5.createImg("../../public/sad.gif");
        // let angry = p5.createImg("../../public/angry.gif");
        // let wow = p5.createImg("../../public/wow.gif");
        // let disgust = p5.createImg("../../public/thinking.gif");
        // let fear = p5.createImg("../../public/cheer_up.gif");

        // let {Engine, Bodies, World} = Matter;
        p5.background(0);

        // elements.forEach(function (ele, i) {
        // 	if (ele.position.x > width || ele.position.x < 0 || ele.position.y < 0 || ele.position.y > height) {
        // 		let tmpEmo = ele.emotion;
        // 		let tmpSize = ele.size;
        // 		elements.splice(i, 1);
        // 		generateCircle(tmpEmo, tmpSize);
        // 	}
        // })

        for(let ele of walls){
            p5.beginShape();
            p5.fill(255);

            for(let vert of ele.vertices){
                p5.vertex(vert.x, vert.y);
            }
            p5.endShape();
        }

        // TODO ele -> walls
        for(let ele of circles) {

            p5.beginShape();
            p5.fill(emotionColor(ele.emotion) || 255);

            // if(mouseConstraint.constraint.bodyB === ele){
            //     console.log("pressed");
            //     Matter.Vertices.scale(ele.vertices, 1.01, 1.01)
            // }

            for(let vert of ele.vertices){
                p5.vertex(vert.x, vert.y);
            }
            p5.endShape();

            //draw face by emotions
            switch (ele.emotion){
                case 'haha':
                    haha.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    haha.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                case 'sad':
                    sad.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    sad.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                case 'angry':
                    angry.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    angry.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                case 'wow':
                    wow.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    wow.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                case 'disgust':
                    disgust.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    disgust.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                case 'fear':
                    fear.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    fear.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
            }
        }
    }

    const emotionColor = (emotion) => {
        switch (emotion){
            case 'haha':
                return "#FFDE32";
            case 'sad':
                return "#4D66F2";
            case 'angry':
                return "#EF5454";
            case 'wow':
                return "#41D7A1";
            case 'disgust':
                return "#318859";
            case 'fear':
                return "#A67CC3";
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

export default Home