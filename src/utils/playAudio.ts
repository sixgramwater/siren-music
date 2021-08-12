import React, { useEffect, useState, useRef } from 'react';
const url =
  'https://res01.hycdn.cn/f49617330a27b290f30df5d2f81d7809/61120A21/siren/audio/20210802/20b4109ab03adb5f450c162b1e532dbd.mp3';

const audioContext = new AudioContext();

// const getBuffer = (url: string) => {
//   const request = new XMLHttpRequest();
//   return new Promise((resolve, reject) => {
//     request.open('GET', url, true);
//     request.responseType = 'arraybuffer';
//     request.onload = () => {
//       audioContext.decodeAudioData(request.response, buffer => buffer ? resolve(buffer): reject('decoding error'));
//     };
//     request.onerror = error => reject(error);
//     request.send();
//   })
// }

const playAudio = (buffer: AudioBuffer) => {
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
};

export interface useAudioProps {
  url: string;
}

type playingState = 'playing' | 'paused' | 'stop';

export const useAudio = (url: string) => {
  const [playingState, setPlayingState] = useState<playingState>('stop');
  const [volume, setVolume] = useState(1);
  const [buffer, setBuffer] = useState<AudioBuffer>();
  const [audioContext, setAudioContext] = useState<AudioContext>();
  // const [source, setSource] = useState<AudioBufferSourceNode>();
  const sourceRef = useRef() as React.MutableRefObject<AudioBufferSourceNode>;
  const gainRef = useRef() as React.MutableRefObject<GainNode>;
  const audioNode = useRef() as React.MutableRefObject<AudioNode>;
  const [pausedAt, setPausedAt] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  useEffect(() => {
    handler();
  }, [url]);

  const handler = async () => {
    initAudioContext();
    const audioBuffer = (await getBuffer()) as AudioBuffer;
    // setup(audioBuffer)
    setBuffer(audioBuffer);
    // setBuffer(audioBuffer as AudioBuffer);
  };
  const initAudioContext = () => {
    const ac = new AudioContext();
    setAudioContext(ac);
  };

  const getBuffer = () => {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        audioContext &&
          audioContext.decodeAudioData(request.response, (buffer) =>
            buffer ? resolve(buffer) : reject('decoding error'),
          );
      };
      request.onerror = (error) => reject(error);
      request.send();
    });
  };

  const setup = (buffer: AudioBuffer) => {
    // if(!audioContext)  return;
    // const source = audioContext.createBufferSource();
    // source.buffer = buffer;
    // source.connect(audioContext.destination);
    // setSource(source);
  };

  const play = () => {
    if (!audioContext || !buffer) return;
    sourceRef.current = audioContext.createBufferSource();
    sourceRef.current.buffer = buffer;
    gainRef.current = audioContext.createGain();
    gainRef.current.gain.value = 0.4;
    // sourceRef.current.connect(gainRef.current).connect(audioContext.destination);
    // audioNode.current = sourceRef.current.connect(gainRef.current);
    sourceRef.current
      .connect(gainRef.current)
      .connect(audioContext.destination);
    // sourceRef.current = source;

    if (pausedAt) {
      setPausedAt(Date.now() - pausedAt);
      // sourceRef.current.start(0, pausedAt/1000);
      sourceRef.current.start(0, pausedAt / 1000);
    } else {
      setStartedAt(Date.now());
      sourceRef.current.start(0);
    }

    // setSource(source);
    setPlayingState('playing');
    // paused = false;
  };
  const stop = () => {
    sourceRef.current.stop(0);
    setPausedAt(Date.now() - startedAt!);
    // audioContext?.resume();
    setPlayingState('stop');
  };
  const setAudioVolume = (volume: number) => {
    if (volume < 0 || volume > 1) return;
    gainRef.current.gain.value = volume;
  };
  return {
    playingState,
    play,
    stop,
    setVolume: setAudioVolume,
  };
};
