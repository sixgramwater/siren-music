import { useEffect, useState } from 'react';
import { debounce } from './debounce';

const isValidFunction = (func: any) => {
  return func && typeof func === 'function';
};

export default function useScroll({ onScroll, onScrollUp, onScrollDown, delay=300 }: {
  onScroll?: Function,
  onScrollUp?: Function,
  onScrollDown?: Function,
  delay?: number
}) {
  const [scroll, setScroll] = useState(
    typeof window === 'undefined' || !window.document
      ? { x: 0, y: 0, direction: '' }
      : {
          x: document.body.getBoundingClientRect().left,
          y: -document.body.getBoundingClientRect().top,
          direction: '',
        }
  );

  useEffect(() => {
    const handleScroll = () => {
      setScroll((prevScroll) => {
        const rect =
          typeof window === 'undefined' || !window.document
            ? { left: 0, top: 0 }
            : document.body.getBoundingClientRect();
        const x = rect.left;
        const y = -rect.top;
        const direction = prevScroll.y > y ? 'up' : 'down';
        const newScroll = { x, y, direction };

        if (isValidFunction(onScroll)) {
          onScroll && onScroll(newScroll);
        }
        if (direction === 'up' && isValidFunction(onScrollUp)) {
          onScrollUp && onScrollUp(newScroll);
        }
        if (direction === 'down' && isValidFunction(onScrollDown)) {
          onScrollDown && onScrollDown(newScroll);
        }

        return newScroll;
      });
    };
    const debouncedScroll = debounce(handleScroll, delay, { isImmediate:true })

    window.addEventListener('scroll', debouncedScroll);

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [onScroll, onScrollDown, onScrollUp]);

  return scroll;
}
