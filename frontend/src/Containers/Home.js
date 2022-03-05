import React from 'react'
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

const Home = () => {

    function preload() {
        haha = createImg("../../public/haha.gif");
        sad = createImg("../../public/sad.gif");
        angry = createImg("../../public/angry.gif");
        wow = createImg("../../public/wow.gif");
        thinking = createImg("../../public/thinking.gif");
        cheer_up = createImg("../../public/cheer_up.gif");
    }

    const setup = (p5, canvasParentRef) => {
        frameRate(60);
        createCanvas(windowWidth, windowHeight);
        background(100);
        // let {Engine, Bodies, World, Mouse, MouseConstraint} = Matter;
        engine = Engine.create();

        generateOutline();

        generateCircle("haha", 200);
        generateCircle("sad", 150);
        generateCircle("angry", 45);
        generateCircle("wow", 80);
        generateCircle("thinking", 90);
        generateCircle("cheer_up", 90);

        var mouse = Mouse.create(canvas.elt);
        mouseConstraint = MouseConstraint.create(engine,{
            mouse: mouse
        })
        World.add(engine.world, mouseConstraint);
        
        World.add(engine.world, elements);
        Engine.run(engine);
    }

    function generateOutline() {
        // let {Engine, Bodies, World} = Matter;
        let ground = Bodies.rectangle(width/2, height, width, 60, {
            isStatic: true
        });
        elements.push(ground);
    
        let left = Bodies.rectangle(0, height/2, 60, height, {
            isStatic: true
        });
        elements.push(left);
    
        let right = Bodies.rectangle(width, height/2, 60, height, {
            isStatic: true
        });
        elements.push(right);
    
        let ceil = Bodies.rectangle(width/2, 0, width, 60, {
            isStatic: true
        });
        elements.push(ceil);
    }
    
    function generateCircle(emotion, cnt) {
        // let {Engine, Bodies, World} = Matter;
        let cir = Bodies.circle(400, 200, cnt || 80);
        cir.emotion = emotion;
        cir.cnt = cnt;
        elements.push(cir);
        console.log(cir);
    }
      
    const draw = p5 => {
        // let {Engine, Bodies, World} = Matter;
        background(0);

        // elements.forEach(function (ele, i) {
        // 	if (ele.position.x > width || ele.position.x < 0 || ele.position.y < 0 || ele.position.y > height) {
        // 		let tmpEmo = ele.emotion;
        // 		let tmpSize = ele.size;
        // 		elements.splice(i, 1);
        // 		generateCircle(tmpEmo, tmpSize);
        // 	}
        // })

        for(let ele of elements) {

            beginShape();
            fill(emotionColor(ele.emotion) || 255);

            if(mouseConstraint.constraint.bodyB === ele){
                console.log("pressed");
                Matter.Vertices.scale(ele.vertices, 1.01, 1.01)
            }

            for(let vert of ele.vertices){
                vertex(vert.x, vert.y);
            }
            endShape();

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
                case 'thinking':
                    thinking.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    thinking.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
                case 'cheer_up':
                    cheer_up.position(ele.position.x - ele.circleRadius*1.4/2, ele.position.y - ele.circleRadius*1.4/2);
                    cheer_up.size(ele.circleRadius*1.4, ele.circleRadius*1.4);
            }
        }
    }

    function emotionColor(emotion) {
        switch (emotion){
            case 'haha':
                return "#FCE76D";
            case 'sad':
                return "#3366FF";
            case 'angry':
                return "#EF5454";
            case 'wow':
                return "#33C5FF";
            case 'thinking':
                return "#24E0AA";
            case 'cheer_up':
                return "#F4704D";
        }
    }
    
    function easeOutBounce(x) {
        const n1 = 7.5625;
        const d1 = 2.75;
        
        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    }
      
    return <Sketch preload={preload} setup={setup} draw={draw} />
}

export default Home