import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function P5Sketch({ draw, setup }) {
  const containerRef = useRef(null);
  const drawRef = useRef(draw);
  const setupRef = useRef(setup);

  drawRef.current = draw;
  setupRef.current = setup;

  useEffect(() => {
    const instance = new p5((sketch) => {
      sketch.setup = () => setupRef.current(sketch);
      sketch.draw = () => drawRef.current(sketch);
    }, containerRef.current);

    return () => instance.remove();
  }, []);

  return <div ref={containerRef} />;
}
