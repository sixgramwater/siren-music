import React from 'react';
import cx from 'classnames';
import styles from './index.less';

export interface RevealButtonProps {
  onClick?: () => void;
  className?: string;
}

const RevealButton: React.FC<RevealButtonProps> = (props) => {
  const { onClick, className, children } = props;

  const returnButtonClass = cx(className, styles.returnButton);
  return (
    <button className={returnButtonClass} onClick={onClick}>
      <svg className={styles.border} viewBox="0 0 138.25 45.25">
        <defs>
          <radialGradient id="revealButtonGradient1" cx="1" cy="0" r="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)"></stop>
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)"></stop>
          </radialGradient>
          <radialGradient id="revealButtonGradient2" cx="0" cy="1" r="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)"></stop>
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)"></stop>
          </radialGradient>
          <path
            id="revealButtonPath"
            strokeWidth="2"
            fill="transparent"
            className={styles.path}
            d="M0.750,0.750 L136.750,0.750 L136.750,43.750 L0.750,43.750 L0.750,0.750 Z"
          ></path>
        </defs>
        <use
          href="#revealButtonPath"
          stroke="url(#revealButtonGradient1)"
        ></use>
        <use
          href="#revealButtonPath"
          stroke="url(#revealButtonGradient2)"
        ></use>
      </svg>
      {/* <i className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 28 35"><line x1="3" y1="5" x2="3" y2="19" stroke-linecap="round" stroke-width="4" stroke="#c6c9ce" fill="none"></line><line x1="10.3" y1="2" x2="10.3" y2="16" stroke-linecap="round" stroke-width="4" stroke="#c6c9ce" fill="none"></line><line x1="17.6" y1="9" x2="17.6" y2="23" stroke-linecap="round" stroke-width="4" stroke="#c6c9ce" fill="none"></line><line x1="25" y1="5" x2="25" y2="19" stroke-linecap="round" stroke-width="4" stroke="#c6c9ce" fill="none"></line></svg>
      </i> */}
      <span>{children}</span>
    </button>
  );
};

export default RevealButton;
