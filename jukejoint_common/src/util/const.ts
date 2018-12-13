const fs = require('fs');
let slink;
try {
  slink = fs.readFileSync('/home/pi/_csrt', 'utf8');
} catch(err) {
  slink = 'NOOP'
}
export const slinkURL = `/${slink}`;

export enum PROVIDERS {
  YOUTUBE = 'youtube',
  BANDCAMP = 'bandcamp',
}

export enum FFMPEG_COMMANDS {
  PAUSE = 'SIGSTOP',
  RESUME = 'SIGCONT',
}

export enum API_URL {
  WS_CONN = '/jukejoint',
  ADD_SONG = '/add_song',
  PAUSE_SONG = '/puase_song',
  PLAY = '/play',
  GET_CURRENT_SONG = '/get_current_song',
  INCREASE_VOLUME = '/increase_volume',
  DECREASE_VOLUME = '/decrease_volume',
}

export const API_PORT = 4004;