import { useAudio } from '@/utils/playAudio';

let audioContext = new AudioContext();
let buffer: AudioBuffer;
let sourceNode: AudioBufferSourceNode;
let gainNode: GainNode;
let length: number = 0;

let loaded = false;
let paused = true;
let startedAt: number | null;
let pausedAt: number | null;
let volume = 1;

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
  console.log('load');
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
  if (!loaded) return;
  sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = buffer;
  gainNode = audioContext.createGain();
  gainNode.gain.value = volume;
  sourceNode.connect(gainNode).connect(audioContext.destination);
  if (pausedAt) {
    startedAt = Date.now() - pausedAt;
    sourceNode.start(0, pausedAt / 1000);
  } else {
    startedAt = Date.now();
    sourceNode.start(0);
  }
  paused = false;
};

export const playFrom = (from: number) => {
  if (!loaded) return;
  sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = buffer;
  gainNode = audioContext.createGain();
  gainNode.gain.value = volume;
  sourceNode.connect(gainNode).connect(audioContext.destination);

  pausedAt = from * 1000;
  startedAt = Date.now() - from * 1000;
  sourceNode.start(0, from);
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

export const pause = () => {
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
