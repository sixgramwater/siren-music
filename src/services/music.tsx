import { useAudio } from '@/utils/playAudio';
import { ReactElement } from 'react';

let audioContext = new AudioContext();
let buffer: AudioBuffer;
let sourceNode: AudioBufferSourceNode;
let gainNode: GainNode;
let analyser: AnalyserNode;
let length: number = 0;

let loaded = false;
let paused = true;
let startedAt: number | null;
let pausedAt: number | null;
let volume = 1;

let canvas: HTMLCanvasElement | null;

export const init = () => {
  loaded = false;
  startedAt = null;
  pausedAt = null;
  length = 0;
  paused = true;
};

export const reset = () => {
  if (!paused) pause();
  loaded = false;
  startedAt = null;
  pausedAt = null;
  length = 0;
  paused = true;
};

export const getBuffer = (url: string) => {
  init();
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

export const isLoaded = () => {
  return loaded;
};

export const getCurTime = () => {
  let offset = 0;
  if (!paused) {
    offset = Date.now() - startedAt!;
  } else {
    offset = pausedAt!;
  }
  return offset;
};

export const load = async (url: string) => {
  // if(loaded) return;
  loaded = false;
  console.log('start load');
  try {
    buffer = (await getBuffer(url)) as AudioBuffer;
  } catch (e) {
    console.warn(e);
    return e;
  }
  length = buffer.duration;
  console.log('length', length);
  loaded = true;
};

// duration
export const getLength = () => {
  if (!loaded) return;
  return buffer.duration;
};

export const reload = async (url: string) => {
  buffer = (await getBuffer(url)) as AudioBuffer;
  loaded = true;
};

export const play = () => {
  // if (!loaded) {
  //   console.log('play: not loaded');
  //   return;
  // }else {
  //   console.log('play: loaded')
  // }
  // sourceNode = audioContext.createBufferSource();
  // sourceNode.buffer = buffer;
  // gainNode = audioContext.createGain();
  // gainNode.gain.value = volume;
  // sourceNode.connect(gainNode).connect(audioContext.destination);
  // if (pausedAt) {
  //   startedAt = Date.now() - pausedAt;
  //   sourceNode.start(0, pausedAt / 1000);
  // } else {
  //   startedAt = Date.now();
  //   console.log('first start')
  //   sourceNode.start(0);
  // }
  // paused = false;
  // console.log('start playing')
  return new Promise((resolve) => {
    if (!loaded) {
      console.log('play: not loaded');
      return;
    } else {
      console.log('play: loaded');
    }
    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = buffer;
    gainNode = audioContext.createGain();
    analyser = audioContext.createAnalyser();
    gainNode.gain.value = volume;
    sourceNode.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);
    if (pausedAt) {
      startedAt = Date.now() - pausedAt;
      sourceNode.start(0, pausedAt / 1000);
    } else {
      startedAt = Date.now();
      console.log('first start');
      sourceNode.start(0);
    }
    paused = false;
    visualize();
    console.log('start playing');
    resolve('load success');
  });
};

export const visualize = () => {
  // if(paused)  return;
  canvas = document.querySelector('.visualizer');
  if(!canvas) return;
  const HEIGHT = canvas.height;
  const WIDTH = canvas.width;
  let canvasCtx = canvas.getContext('2d');

  analyser.fftSize = 256;
  let bufferLength = analyser.frequencyBinCount;
  console.log('bufferLength', bufferLength);
  let dataArray = new Uint8Array(bufferLength);
  canvasCtx?.clearRect(0,0,WIDTH,HEIGHT);
  const draw = () => {
    if(paused && canvasCtx) {
      canvasCtx.clearRect(0,0,WIDTH,HEIGHT);
    }
    if(paused || !canvasCtx)  return;

    let drawVisual = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    // canvasCtx.fillStyle = 'rgb(0,0,0)';
    canvasCtx.clearRect(0,0,WIDTH,HEIGHT);
    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for(let i=0; i< bufferLength; i++) {
      barHeight = dataArray[i];

      canvasCtx.fillStyle = 'rgb(160, 237, 255)';
      canvasCtx.fillRect(x, HEIGHT-barHeight/2, barWidth, barHeight);
      x += barWidth+1;

    }
  }
  draw();
}

export const playFrom = (from: number) => {
  if (!loaded) return;
  sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = buffer;
  gainNode = audioContext.createGain();
  gainNode.gain.value = volume;
  analyser = audioContext.createAnalyser();
    // gainNode.gain.value = volume;
  sourceNode.connect(gainNode);
  gainNode.connect(analyser);
  analyser.connect(audioContext.destination);
  // sourceNode.connect(gainNode).connect(audioContext.destination);
  pausedAt = from * 1000;
  startedAt = Date.now() - from * 1000;
  sourceNode.start(0, from);
  visualize();
  paused = false;
  // if(pausedAt) {

  // }
};

// setInitialVolume
export const setInitialVolume = (value: number) => {
  if (value < 0 || value > 1) return;
  volume = value;
  // gainNode.gain.value = value;
};

export const setPlayingVolume = (value: number) => {
  if (value < 0 || value > 1) return;
  volume = value;
  if (!paused) {
    gainNode.gain.value = value;
  }
};

export const pause = async () => {
  if (!loaded) return;
  sourceNode.stop(0);

  pausedAt = Date.now() - startedAt!;
  paused = true;
};

const prefix = 'https://monster-siren.hypergryph.com';

export const requestMusicDetail = async (cid: string) => {
  const res = await fetch(`/api/song/${cid}`);
  const data = await res.json();
  return data.data;
};

export const requestAlbumDetail = async (cid: string) => {
  const res = await fetch(`/api/album/${cid}/detail`);
  const data = await res.json();
  return data.data;
};

export const requestSongs = async () => {
  const res = await fetch(`/api/songs`);
  const data = await res.json();
  return data.data.list;
};

export const requestAlbums = async () => {
  const res = await fetch(`/api/albums`);
  const data = await res.json();
  return data.data;
};
