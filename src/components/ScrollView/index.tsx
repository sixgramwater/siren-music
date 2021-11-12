import styles from './index.less';
import React from 'react';
import Scrollbar from 'react-scrollbars-custom';

interface ScrollViewProps {
  wrapperStyle?: React.CSSProperties;
}

const ScrollView: React.FC<ScrollViewProps> = (props) => {
  const { children } = props;
  const handleScroll = () => {};
  const wrapperStyle: React.CSSProperties = {
    WebkitMask:
      'linear-gradient(transparent, rgb(255, 255, 255) 10%, rgb(255, 255, 255) 90%, transparent 100%) center top',
  };
  return (
    <Scrollbar
      onScroll={handleScroll}
      style={{
        width: '100%',
        height: '100%',
      }}
      trackXProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{ visibility: 'hidden' }}
            ></div>
          );
        },
      }}
      trackYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{ visibility: 'hidden' }}
            ></div>
          );
        },
      }}
      renderer={(props) => {
        const { elementRef, ...restProps } = props;
        return (
          <div {...restProps} ref={elementRef} className={styles.scrollView} />
        );
      }}
      wrapperProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              className={styles.container}
              style={wrapperStyle}
            />
          );
        },
      }}
    >
      {/* {
        PARAGRAPHS_TEXT.map((text, index)=><p key={index}>{text}</p>)
      } */}
      {children}
    </Scrollbar>
  );
};

export default ScrollView;
