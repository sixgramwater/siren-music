import { useImage } from 'react-image';
import React, { Suspense } from 'react';
import cx from 'classnames';

export interface ImageProps {
  imgSrc: string;
  useSuspense?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Image: React.FC<ImageProps> = (props) => {
  const { imgSrc, useSuspense, className, style } = props;
  const { src } = useImage({
    srcList: imgSrc,
  });

  // const renderer = () => {
  //   return (
  //     <Suspense fallback={

  //     }>
  //       <img src={src} className={className} style={style} referrerPolicy="no-referrer"/>
  //     </Suspense>
  //   )
  //   // if(useSuspense) {
  //   //   return (
  //   //     <Suspense fallback={
  //   //       <div/>
  //   //     }>
  //   //       <img src={src} className={className} style={style} referrerPolicy="no-referrer"/>
  //   //     </Suspense>
  //   //   )
  //   // }
  //   // else {
  //   //   return(
  //   //     <img src={src} className={className} style={style} referrerPolicy="no-referrer"/>
  //   //   )
  //   // }
  // }
  return (
    // renderer()
    // <Suspense fallback={
    //   <>
    //     123
    //   </>
    // }>
    <img
      src={src}
      className={className}
      style={style}
      
      referrerPolicy="no-referrer"
    />
    // </Suspense>
  );
};

Image.defaultProps = {
  useSuspense: true,
};

export default Image;
