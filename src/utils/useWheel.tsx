import React, { useEffect, useState } from 'react';
// import { debounce } from './debounce';
import {debounce} from 'lodash'

const useWheel = ({
  onWheelUp,
  onWheelDown,
  delay=1000,
}:{
  onWheelUp?: Function,
  onWheelDown?: Function,
  delay?: number,
}) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if(e.deltaY < 0) {
        onWheelUp && onWheelUp()
      }
      if(e.deltaY > 0) {
        onWheelDown && onWheelDown()
      }
    }
    const debouncedWrapper = debounce(handleWheel, delay, {
      leading: true,
      trailing: false,
      // isImmediate: true,
    })
    document.addEventListener('wheel', debouncedWrapper);
    return(() => document.removeEventListener('wheel', debouncedWrapper))
  }, [onWheelDown, onWheelUp, delay])
}

export default useWheel;
