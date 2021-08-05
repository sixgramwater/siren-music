import { useEffect, useState } from 'react';

export interface useSwipeType {
  onSwipeLeft?: Function,
  onSwipeRight?: Function,
  onSwipeUp?: Function,
  onSwipeDown?: Function,
}

export const useSwipe = ({
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}: useSwipeType) => {
  const [start, setStart] = useState<Touch>();
  // const [end, setEnd] = useState();
  useEffect(() => {
    const handler = (e: TouchEvent) => {
      setStart(e.changedTouches[0])
    }
    window.addEventListener('touchstart', handler);
    return ()=>{
      window.removeEventListener('touchstart', handler)
    }
  }, [onSwipeLeft, onSwipeRight])
  useEffect(() => {
    const handler = (e: TouchEvent) =>  {
      let end = e.changedTouches[0];
        if(start!.screenX - end.screenX < 0) {
          onSwipeRight && onSwipeRight();
        }
        if(start!.screenX - end.screenX > 0) {
          onSwipeLeft && onSwipeLeft();
        }
    }
    window.addEventListener('touchend', handler);
    return () => {
      window.removeEventListener('touchend', handler);
    }
  }, [onSwipeRight, onSwipeLeft])
}
