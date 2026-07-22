import { useEffect, useRef } from 'react';
import lottie from 'lottie-web/build/player/lottie_light.js';

export default function LottiePlayer({
  animationData,
  direction = 1,
  onEnterFrame,
  onLoopComplete,
  play = true,
  speed = 1,
  style,
}) {
  const animationRef = useRef(null);
  const containerRef = useRef(null);
  const enterFrameRef = useRef(onEnterFrame);
  const loopCompleteRef = useRef(onLoopComplete);

  enterFrameRef.current = onEnterFrame;
  loopCompleteRef.current = onLoopComplete;

  useEffect(() => {
    const animation = lottie.loadAnimation({
      animationData,
      autoplay: play,
      container: containerRef.current,
      loop: true,
      renderer: 'svg',
    });

    const handleEnterFrame = () => enterFrameRef.current?.();
    const handleLoopComplete = () => loopCompleteRef.current?.();
    animation.addEventListener('enterFrame', handleEnterFrame);
    animation.addEventListener('loopComplete', handleLoopComplete);
    animationRef.current = animation;

    return () => {
      animation.removeEventListener('enterFrame', handleEnterFrame);
      animation.removeEventListener('loopComplete', handleLoopComplete);
      animation.destroy();
      animationRef.current = null;
    };
  }, [animationData]);

  useEffect(() => {
    animationRef.current?.setDirection(direction);
  }, [direction]);

  useEffect(() => {
    animationRef.current?.setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    if (play) animationRef.current?.play();
    else animationRef.current?.pause();
  }, [play]);

  return <div ref={containerRef} style={style} />;
}
