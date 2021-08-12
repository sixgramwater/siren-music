import { Reducer, Effect, Subscription, Action } from 'umi';
import {
  requestMusicDetail,
  load,
  play,
  pause,
  playFrom,
  isLoaded,
  getLength,
  reset,
  getCurTime,
  setInitialVolume,
  setPlayingVolume,
} from '../services/music';

export interface songType {
  cid: string;
  name: string;
  albumCid: string;
  artists: string[];
}

export interface albumType {
  cid: string; // albumn cid
  coverUrl: string;
  name: string;
  artistes: string[];
}

export interface albumDetailProps {
  cid: string; // albumn cid
  belong?: string;
  coverDeUrl?: string;
  coverUrl: string;
  intro?: string;
  songs: songType[];
}

export interface musicDetailProps {
  albumCid: string;
  artists: string[];
  cid: string; // music cid
  lyricUrl: string | null; // 可能没有
  mvUrl: string | null;
  mvCoverUrl: string | null;
  name: string; // music title
  sourceUrl: string; // music source url
}

export type playStateType = 'playing' | 'paused' | 'stop';
export type loopType = 'allLoop' | 'randomLoop' | 'singleLoop' | 'singleStop';

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

  curTime: number;

  duration: number;
}

export interface MusicModelProps {
  namespace: 'music';
  state: MusicStateType;
  reducers: {
    setPlayingState: Reducer<MusicStateType>;
    setLoopState: Reducer<MusicStateType>;
    setVolume: Reducer<MusicStateType>;
    setSongs: Reducer<MusicStateType>;
    setAlbums: Reducer<MusicStateType>;
    setCurMusic: Reducer<MusicStateType>;
    setCurAlbum: Reducer<MusicStateType>;
    setCurTime: Reducer<MusicStateType>;
    setDuration: Reducer<MusicStateType>;
  };
  effects: {
    fetchMusicDetail: Effect;
    playSongs: Effect;
    stopSongs: Effect;
    loadSongs: Effect;
    playSongsFrom: Effect;
    setPlayingVolume: Effect;
    onEnd: Effect;
  };
  subscriptions: {};
}

const initialState: MusicStateType = {
  // songs: [],
  songs: [
    { cid: '697659', name: 'Y1K', albumCid: '7787', artists: ['塞壬唱片-MSR'] },
    {
      cid: '953910',
      name: 'Across the wind',
      albumCid: '1036',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '125002',
      name: 'Keep the torch',
      albumCid: '9392',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779421',
      name: 'CanNot Wait For',
      albumCid: '5119',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514575',
      name: 'ManiFesto',
      albumCid: '5119',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '232293',
      name: '灯华梦踏',
      albumCid: '5119',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '880376',
      name: '前航远歌',
      albumCid: '5119',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514587',
      name: 'Real Me',
      albumCid: '0250',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '461194',
      name: 'Immutable (Instrumental)',
      albumCid: '2465',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779439',
      name: 'Immutable',
      albumCid: '2465',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306850',
      name: 'Voices',
      albumCid: '3801',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953922',
      name: 'Feels',
      albumCid: '7788',
      artists: ['塞壬唱片-MSR', 'Low Roar'],
    },
    {
      cid: '125011',
      name: 'Hold Onto The Light',
      albumCid: '4523',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048745',
      name: 'Gearing Up',
      albumCid: '1037',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '232203',
      name: 'Loyal to the beat（Instrumenta）',
      albumCid: '6676',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048746',
      name: 'Loyal to the beat',
      albumCid: '6676',
      artists: ['塞壬唱片-MSR', ' Emperor'],
    },
    {
      cid: '306851',
      name: 'Operation Cinder (Instrumental)',
      albumCid: '4524',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '461195',
      name: 'Operation Blade (Instrumental)',
      albumCid: '4524',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953923',
      name: 'Operation Pyrite (Instrumental)',
      albumCid: '4524',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '461196',
      name: 'Operation Cinder',
      albumCid: '4524',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '880378',
      name: 'Operation Blade',
      albumCid: '4524',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048747',
      name: 'Operation Pyrite',
      albumCid: '4524',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779430',
      name: 'Daydaydream (instrumental)',
      albumCid: '5113',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953928',
      name: 'Daydaydream',
      albumCid: '5113',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '880371',
      name: 'Under the Sands 沙尘之下',
      albumCid: '8948',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306855',
      name: 'Originium Abomination 源石恶物',
      albumCid: '8948',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697663',
      name: 'Rainbow Team 彩虹小队',
      albumCid: '8948',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306856',
      name: 'Tactical Ambush 战术伏击',
      albumCid: '8948',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514582',
      name: '观心',
      albumCid: '1031',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048740',
      name: '更阑影',
      albumCid: '3805',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '461199',
      name: '尽波澜',
      albumCid: '6670',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '232207',
      name: '奇兵天坠',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306854',
      name: '尽归霜雪',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048749',
      name: '尘沙扬',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '880370',
      name: '落子无悔',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697662',
      name: '阴云',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514581',
      name: 'Dash！',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '125015',
      name: '江湾小酌',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779433',
      name: '来自雪原的回响',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    { cid: '125016', name: '37℃', albumCid: '2469', artists: ['塞壬唱片-MSR'] },
    {
      cid: '232208',
      name: 'Абсолю́тный нуль температу́ры(absolute zero)',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953927',
      name: '近卫局攻坚小队',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779434',
      name: '0:00:01',
      albumCid: '2469',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953926',
      name: '冬涤 (Instrumental)',
      albumCid: '7782',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '461198',
      name: '冬涤',
      albumCid: '7782',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306853',
      name: 'Till the Bell Tolls',
      albumCid: '0254',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697669',
      name: 'Rock the Night Away (Instrumental)',
      albumCid: '4526',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697661',
      name: 'Rock the Night Away',
      albumCid: '4526',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779432',
      name: 'Tipsy',
      albumCid: '0253',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514580',
      name: 'LITHOS',
      albumCid: '2468',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514588',
      name: 'Lullabye (Instrumental)',
      albumCid: '9395',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '125014',
      name: 'Lullabye',
      albumCid: '9395',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '461197',
      name: 'CONFRONT',
      albumCid: '7781',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048748',
      name: 'Stay Gold',
      albumCid: '9393',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '232204',
      name: '秋绪 (Instrumental)',
      albumCid: '1038',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '125013',
      name: '秋绪',
      albumCid: '1038',
      artists: ['塞壬唱片-MSR', '山川恵津子'],
    },
    {
      cid: '232205',
      name: 'Reconnection',
      albumCid: '0251',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '880377',
      name: 'ALIVE (Instrumental)',
      albumCid: '8945',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306852',
      name: 'ALIVE',
      albumCid: '8945',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697660',
      name: 'Evolutionary Mechanization',
      albumCid: '5110',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514589',
      name: 'El Brillo Solitario',
      albumCid: '7789',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953924',
      name: '夏浪',
      albumCid: '3802',
      artists: ['塞壬唱片-MSR', '横山克'],
    },
    {
      cid: '697664',
      name: 'Lily of the Valley',
      albumCid: '6677',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '232209',
      name: "Everything's Alright (Instrumental)",
      albumCid: '2466',
      artists: ['塞壬唱片-MSR', 'DJ Okawari'],
    },
    {
      cid: '461190',
      name: "Everything's Alright",
      albumCid: '2466',
      artists: ['塞壬唱片-MSR', 'DJ Okawari'],
    },
    {
      cid: '880372',
      name: 'УраУра',
      albumCid: '9394',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048741',
      name: '从那高地上远眺',
      albumCid: '9394',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779435',
      name: 'Reversed time',
      albumCid: '0252',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514583',
      name: 'Sparkling Hydraulics',
      albumCid: '1039',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779436',
      name: 'Requiem (Instrumental)',
      albumCid: '7780',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '125018',
      name: 'Requiem',
      albumCid: '7780',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306857',
      name: 'Renegade (Instrumental)',
      albumCid: '4525',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514584',
      name: 'Renegade',
      albumCid: '4525',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953929',
      name: 'Curtain Call',
      albumCid: '5111',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '232200',
      name: '春弦',
      albumCid: '6678',
      artists: ['塞壬唱片-MSR', '横山克'],
    },
    {
      cid: '048742',
      name: '故乡的风',
      albumCid: '3803',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '461191',
      name: 'Operation Barrenland (W&W Soundtrack Mix)',
      albumCid: '2467',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697665',
      name: '独行长路',
      albumCid: '8946',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '880373',
      name: '示岁',
      albumCid: '3804',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697666',
      name: 'Boiling Blood (Instrumental)',
      albumCid: '5112',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306858',
      name: 'Boiling Blood',
      albumCid: '5112',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779437',
      name: 'Zone 10⁻⁸',
      albumCid: '6679',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '125012',
      name: 'Speed of Light (Instrumental)',
      albumCid: '1030',
      artists: ['DJ Okawari'],
    },
    {
      cid: '880374',
      name: 'Speed of Light',
      albumCid: '1030',
      artists: ['塞壬唱片-MSR', 'DJ Okawari'],
    },
    { cid: '125019', name: 'Ready？', albumCid: '8947', artists: [' D.D.D.'] },
    {
      cid: '953920',
      name: 'Not Your Business',
      albumCid: '8947',
      artists: [' Emperor'],
    },
    {
      cid: '461192',
      name: 'Aflame Avenue',
      albumCid: '8947',
      artists: ['Alive Until Sunset'],
    },
    {
      cid: '232201',
      name: '旅途前方',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514585',
      name: '永冻症',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048743',
      name: '执棋者之骨',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '514586',
      name: '血液',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '779438',
      name: '终局抵抗者',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '697667',
      name: '大柏墟',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '048744',
      name: '短兵相接',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '306859',
      name: '人性',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '125010',
      name: '泛用型自动化解决方案0.3.2.9f2',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '232202',
      name: '生命流',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '953921',
      name: '逃亡part2',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
    {
      cid: '880375',
      name: 'Synthetech',
      albumCid: '4527',
      artists: ['塞壬唱片-MSR'],
    },
  ],
  albums: [
    {
      cid: '7787',
      name: 'Y1K',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210802/51e04c117144fc16b604d9fa206ab919.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '1036',
      name: 'Across the wind',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210802/e4c5d899ce336fd6a866d45582c73aee.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '9392',
      name: 'Keep the torch',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210625/50dd8b314485b1a2e082171aca70707b.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '5119',
      name: '音律联觉原声EP',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210610/f9cbb7cfa28e422b8da474d4a2e3e2aa.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '0250',
      name: 'Real Me',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210531/64eb57d1af5fbff9897633d06e1c3981.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '2465',
      name: 'Immutable',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210501/01bdad2a0a6876eaee3c23bf0812a73a.png',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '3801',
      name: 'Voices',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210429/c7596adbfdc817fe4879acc19e091932.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '7788',
      name: 'Feels',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210423/0362aa6d679e34db3147deaf06460e1e.jpg',
      artistes: ['塞壬唱片-MSR', 'Low Roar'],
    },
    {
      cid: '4523',
      name: 'Hold Onto The Light',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210423/b44080de2ffacc77eb3769476a84eba6.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '1037',
      name: 'Gearing Up',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210414/167cc0c475d89d2fdef683464edd0ad7.png',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '6676',
      name: 'Loyal to the beat',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210401/96a09a0141075ee6771fb7a3c50602b3.jpg',
      artistes: ['塞壬唱片-MSR', ' Emperor'],
    },
    {
      cid: '4524',
      name: '危机合约黄铁·利刃·燃灰OST',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210325/923286f4ab26284016de9ed03150fad7.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '5113',
      name: 'Daydaydream',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/f3016d2a49257eb6203de060f5a6b374.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '8948',
      name: '源石尘行动OST',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/fceb59967a75a9893cb679d27e9357ec.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '1031',
      name: '观心',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/ac6ca84ecbce8b8487ca6e0df4345417.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '3805',
      name: '更阑影',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/f9d496c62d83601bd08c33f6c3d40677.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '6670',
      name: '尽波澜',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/61c1f9f5a4cf026333c03c28eabe31c8.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '2469',
      name: '明日方舟OST2',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/999ec775dcb4556ff34289a292779ab0.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '7782',
      name: '冬涤',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/ab70d9e8da2bc75a7a09517a6827e420.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '0254',
      name: 'Till the Bell Tolls',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/276a9a6fd3ddb29ee872b5683eec4d53.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '4526',
      name: 'Rock the Night Away',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/0a67331e0f88b8fdf1b1ebe365b76a84.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '0253',
      name: 'Tipsy',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/b62ff3caf8c32adbba41325644ccab49.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '2468',
      name: 'LITHOS',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/1b707af85431677397b9572b4d448e78.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '9395',
      name: 'Lullabye',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/5fb9a7a5d2045c5c6a16f2c4ed8e08f4.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '7781',
      name: 'CONFRONT',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/9f922038381cc1e4403c0d19d925fbb5.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '9393',
      name: 'Stay Gold',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/430cb5399e272d97779cf5f13681628f.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '1038',
      name: '秋绪',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/7a3ca07bbd9dc0369155d880a1f3ae4d.jpg',
      artistes: ['塞壬唱片-MSR', '山川恵津子'],
    },
    {
      cid: '0251',
      name: 'Reconnection',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/9252fcc32ebdf5cdf47ef5a220c8950a.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '8945',
      name: 'ALIVE',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/7d9ab6167720f8f4b982c83fbe89ce0b.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '5110',
      name: 'Evolutionary Mechanization',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/80c0cbb9bec652d21e939586e19aa9ed.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '7789',
      name: 'El Brillo Solitario',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/659ff2f51e057c6f20c35c56e365c51e.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '3802',
      name: '夏浪',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/030f3e0c1c3d5167f14c595477ba8fcc.jpg',
      artistes: ['塞壬唱片-MSR', '横山克'],
    },
    {
      cid: '6677',
      name: 'Lily of the Valley',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/9eda2028b10cdb005b9bc6c70f86150e.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '2466',
      name: "Everything's Alright",
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/fe18ca43cbf7e7fc3541081d7a62ccef.jpg',
      artistes: ['塞壬唱片-MSR', 'DJ Okawari'],
    },
    {
      cid: '9394',
      name: '从那高地上远眺',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/c9cd38a5c0b1327aa936823b57ccd1fb.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '0252',
      name: 'Reversed Time',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/096ebe9a50ee35408e5f66fa7a7702fc.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '1039',
      name: 'Sparkling Hydraulics',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/18f80a3290a3f0c892c806156066bf46.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '7780',
      name: 'Requiem',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/14db9942c28a5abba48b9dfe2d99e39a.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '4525',
      name: 'Renegade',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/40a13076601806e37c5394049cebc5b1.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '5111',
      name: 'Curtain Call',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/acf343a6085c8fcdfe8aec67bd1e76d7.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '6678',
      name: '春弦',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/8b284f34febb12d4cb1ad6afd52bb135.jpg',
      artistes: ['塞壬唱片-MSR', '横山克'],
    },
    {
      cid: '3803',
      name: '故乡的风',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/c755e05031749ec0d7422078ae3189e7.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '2467',
      name: 'Operation Barrenland',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/ab4204cb9509eea67a855611bbd5d670.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '8946',
      name: '独行长路',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210727/d01c9b65184c11ed6fe7b1019a023b16.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '3804',
      name: '示岁',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/939e5e132b395a0e436513a941c8c2aa.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '5112',
      name: 'Boiling Blood',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/dfe97934b38b1b93ee72e0c5601a79b7.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '6679',
      name: 'Zone 10⁻⁸',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/12b2b9570bb07ffeaff2379660da7711.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
    {
      cid: '1030',
      name: 'Speed of Light',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/56cbcd1d0093d8ee8ee22bf6d68ab4a6.jpg',
      artistes: ['塞壬唱片-MSR', 'DJ Okawari'],
    },
    {
      cid: '8947',
      name: '火蓝之心原声带',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/199df150e1370a4138fa0352ff95a5b5.jpg',
      artistes: ['Alive Until Sunset', ' Emperor', ' D.D.D.'],
    },
    {
      cid: '4527',
      name: '明日方舟OST1',
      coverUrl:
        'https://web.hycdn.cn/siren/pic/20210322/bb51040a1dfe53b97590451156852bd6.jpg',
      artistes: ['塞壬唱片-MSR'],
    },
  ],
  curAlbum: null,
  curMusic: {
    albumCid: '1036',
    artists: ['塞壬唱片-MSR'],
    cid: '953910',
    lyricUrl:
      'https://web.hycdn.cn/siren/lyric/20210802/b4711d09714fe36c2ee4e7de0bada3d7.lrc',
    mvCoverUrl: null,
    mvUrl: null,
    name: 'Across the wind',
    sourceUrl:
      'https://res01.hycdn.cn/64eb52c7ec48e88242d62b77d5d1131a/61124691/siren/audio/20210802/20b4109ab03adb5f450c162b1e532dbd.mp3',
  },
  // curMusic: null,
  playingState: 'stop',
  loopState: 'allLoop',
  volume: 0.5,
  curTime: 0,
  duration: 0,
};

const MusicModel: MusicModelProps = {
  namespace: 'music',
  state: initialState,
  reducers: {
    setPlayingState: (state, { payload }) => {
      return {
        ...state,
        playingState: payload,
      } as MusicStateType;
    },
    setLoopState: (state, { payload }) => {
      return {
        ...state,
        loopState: payload,
      } as MusicStateType;
    },
    setVolume: (state, { payload }) => {
      return {
        ...state,
        volume: payload,
      } as MusicStateType;
    },
    setAlbums: (state, { payload }) => {
      return {
        ...state,
        albums: payload,
      } as MusicStateType;
    },
    setSongs: (state, { payload }) => {
      return {
        ...state,
        songs: payload,
      } as MusicStateType;
    },
    setCurAlbum: (state, { payload }) => {
      return {
        ...state,
        curAlbum: payload,
      } as MusicStateType;
    },
    setCurMusic: (state, { payload }) => {
      return {
        ...state,
        curMusic: payload,
      } as MusicStateType;
    },
    setDuration: (state, { payload }) => {
      return {
        ...state,
        duration: payload,
      } as MusicStateType;
    },
    setCurTime: (state, { payload }) => {
      return {
        ...state,
        curTime: payload,
      } as MusicStateType;
    },
  },
  effects: {
    *fetchMusicDetail({ payload }, { call, put, select }) {
      const data = yield call(requestMusicDetail);
      yield put({
        type: 'music/setCurMusic',
        payload: data,
      });
    },
    *playSongs({ payload }, { call, put, select }) {
      console.log('trigger');
      const curMusic: musicDetailProps = yield select(
        (state: any) => state.music.curMusic,
      );
      // console.log(curMusic)
      let playingState: playStateType = yield select(
        (state: any) => state.music.playingState,
      );
      const duration: number = yield select(
        (state: any) => state.music.duration,
      );
      // console.log(playingState)
      if (playingState === 'playing') return;
      if (!curMusic) return;
      console.log('before load');
      // console.log(curMusic);
      // yield call(load, curMusic.sourceUrl);
      const loaded = yield call(isLoaded);
      if (!loaded) return;
      yield call(play);
      yield put({
        type: 'setPlayingState',
        payload: 'playing',
      });
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      while (true) {
        // playingState = yield select((state: any) => state.music.playingState);
        // console.log(playingState);

        const curTime = yield call(getCurTime);
        yield put({
          type: 'setCurTime',
          payload: curTime / 1000,
        });
        console.log(curTime / 1000);
        yield call(delay, 1000);
        playingState = yield select((state: any) => state.music.playingState);
        if (playingState !== 'playing') break;
        if (curTime / 1000 >= duration) {
          yield put({
            type: 'onEnd',
          });
          break;
          //
        }
      }
    },
    *playSongsFrom({ payload }, { call, put, select }) {
      const curMusic: musicDetailProps = yield select(
        (state: any) => state.music.curMusic,
      );
      console.log(curMusic);
      let playingState: playStateType = yield select(
        (state: any) => state.music.playingState,
      );
      console.log(playingState);
      if (!curMusic) return;
      if (playingState === 'playing') {
        yield call(pause);
        // yield call(playFrom, payload);
      }
      yield call(playFrom, payload);
      if (playingState !== 'playing') {
        yield call(pause);
      }
      // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
      // while(true) {
      //   // playingState = yield select((state: any) => state.music.playingState);
      //   // console.log(playingState);

      //   const curTime = yield call(getCurTime);
      //   yield put({
      //     type: 'setCurTime',
      //     payload: curTime/1000,
      //   });
      //   console.log(curTime/1000);
      //   yield call(delay, 1000);
      //   playingState = yield select((state: any) => state.music.playingState);
      //   if(playingState !=='playing')  break;
      // }
    },

    *stopSongs({ payload }, { call, put, select }) {
      console.log('stop');
      const playingState: playStateType = yield select(
        (state: any) => state.music.playingState,
      );
      if (playingState === 'paused' || playingState === 'stop') return;
      const loaded = yield call(isLoaded);
      if (!loaded) return;
      console.log('start pause');
      yield call(pause);
      yield put({
        type: 'setPlayingState',
        payload: 'paused',
      });
    },

    *loadSongs({ payload }, { call, put, select }) {
      try {
        const playingState = select((state: any) => state.music.playingState);
        if (playingState === 'playing') {
          yield call(pause);
        }
        const cid = payload;
        const musicDetail: musicDetailProps = yield call(
          requestMusicDetail,
          cid,
        );
        yield put({
          type: 'setCurMusic',
          payload: musicDetail,
        });
        yield call(reset);

        yield call(load, musicDetail.sourceUrl);
        const volume = yield select((state: any) => state.music.volume);
        yield call(setInitialVolume, volume);
        const duration = yield call(getLength);
        yield put({
          type: 'setDuration',
          payload: duration,
        });
        yield put({
          type: 'setCurTime',
          payload: 0,
        });
      } catch (e) {
        console.error(e);
      }
      // const cid = payload;
      // const musicDetail: musicDetailProps = yield call(requestMusicDetail, cid);
      // yield put({
      //   type: 'setCurMusic',
      //   payload: musicDetail,
      // });
      // yield call(load, musicDetail.sourceUrl);
    },
    *setPlayingVolume({ payload }, { put, select, call }) {
      yield call(setPlayingVolume, payload);
      yield put({
        type: 'setVolume',
        payload,
      });
    },
    *onEnd({ payload }, { put, select, call }) {
      console.log('on End');
      yield call(reset);
      // single play
      yield put({
        type: 'setCurTime',
        payload: 0,
      });
      yield put({
        type: 'setPlayingState',
        payload: 'stop',
      });
      // prepare to load (which songs?)
      const curMusic: musicDetailProps = yield select(
        (state: any) => state.music.curMusic,
      );
      const loopState: loopType = yield select(
        (state: any) => state.music.loopState,
      );
      const songs: songType[] = yield select((state: any) => state.music.songs);
      let nextCid: string;
      if (loopState === 'allLoop') {
        const idx = songs.findIndex((song: songType) => {
          return song.cid === curMusic.cid;
        });
        nextCid = songs[(idx + 1) % songs.length].cid;
      } else if (loopState === 'randomLoop') {
        const idx = Math.round(songs.length * Math.random());
        nextCid = songs[idx % songs.length].cid;
      } else if (loopState === 'singleLoop') {
        nextCid = curMusic.cid;
      } else if (loopState === 'singleStop') {
        return;
      } else {
        nextCid = curMusic.cid;
      }
      console.log(nextCid);
      yield put({
        type: 'loadSongs',
        payload: nextCid,
      });
    },
  },
  subscriptions: {},
};

export default MusicModel;
