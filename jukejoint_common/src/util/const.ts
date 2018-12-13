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
  INCREASE_VOLUME = 'increase_volume',
  DECREASE_VOLUME = 'decrease_volume',
}

export const API_PORT = 4004;