import { Reducer, Effect, Subscription, Action } from 'umi';


interface songType {
  cid: string;
  name: string;
  albumCid: string;
  artists: string[];
}

interface albumType {
  cid: string; // albumn cid
  coverUrl: string;
  name: string;
  artists: string[];

}

interface albumDetailProps {
  cid: string; // albumn cid
  belong?: string;
  coverDeUrl?: string;
  coverUrl: string;
  intro?: string;
  songs: songType[];
}

interface musicDetailProps {
  albumCid: string;
  artists: string[];
  cid: string; // music cid
  lyricUrl: string | null; // 可能没有
  mvUrl: string | null;
  mvCoverUrl: string | null;
  name: string; // music title
  sourceUrl: string; // music source url

}

type playStateType = 'playing' | 'paused' | 'stop';
type loopType = 'allLoop' | 'randomLoop' | 'singleLoop' | 'singleStop'


export interface MusicStateType {
  songs: songType[] | [];
  // https://monster-siren.hypergryph.com/api/songs

  albums: albumType[] | [];
  // https://monster-siren.hypergryph.com/api/albums

  curMusic: musicDetailProps | null;
  // https://monster-siren.hypergryph.com/api/song/953923

  curAlbum: albumDetailProps | null;
  // https://monster-siren.hypergryph.com/api/album/5119/detail

  playingState: playStateType;

  loopState: loopType;

  volume: number;

}

export interface MusicModelProps {
  namespace: 'music',
  state: MusicStateType,
  reducers: {
    setPlayingState: Reducer<MusicStateType>,
    setLoopState: Reducer<MusicStateType>,
    setVolume: Reducer<MusicStateType>,
    setSongs: Reducer<MusicStateType>,
    setAlbums: Reducer<MusicStateType>,
    setCurMusic: Reducer<MusicStateType>,
    setCurAlbum: Reducer<MusicStateType>,
  },
  effects: {

  },
  subscriptions: {

  }
}

const initialState: MusicStateType = {
  songs: [],
  albums: [],
  curAlbum: null,
  curMusic: null,
  playingState: 'stop',
  loopState: 'allLoop',
  volume: 0.5,
}


const MusicModel: MusicModelProps = {
  namespace: 'music',
  state: initialState,
  reducers: {
    setPlayingState: (state, { payload }) => {
      return {
        ...state,
        playingState: payload
      } as MusicStateType
    },
    setLoopState: (state, { payload }) => {
      return {
        ...state,
        loopState: payload
      } as MusicStateType
    },
    setVolume: (state, { payload }) => {
      return {
        ...state,
        volume: payload
      } as MusicStateType
    },
    setAlbums: (state, { payload }) => {
      return {
        ...state,
        albums: payload
      } as MusicStateType
    },
    setSongs: (state, { payload }) => {
      return {
        ...state,
        songs: payload
      } as MusicStateType
    },
    setCurAlbum: (state, { payload }) => {
      return {
        ...state,
        curAlbum: payload
      } as MusicStateType
    },
    setCurMusic: (state, { payload }) => {
      return {
        ...state,
        curMusic: payload
      } as MusicStateType
    }
  },
  effects: {

  },
  subscriptions: {

  }

}

export default MusicModel;
