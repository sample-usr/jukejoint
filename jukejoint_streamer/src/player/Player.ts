const lame = require('lame');
const Speaker = require('speaker');
const loudness = require('loudness');
import * as ffmpeg from 'fluent-ffmpeg';

// Utils
import { logger } from '@jukejoint/common/lib/util/general';
// Constants
// Models
import { SongModel } from '@jukejoint/common/lib/models';
import Provider from '../providers/Provider';
// Interfaces
import { IPlayer } from '@jukejoint/common/lib/interfaces';

export default class Player {
  private constructor() {}
  private static instance:Player;

  static getInstance = () => {
    if (!Player.instance) {
      Player.instance = new Player();
    }
    return Player.instance;
  }

  private speaker:any;
  private decoder:any;
  private stream:any;
  private isPlaying = false;
  private currentSong:SongModel;
  private SPEAKER_CLOSE_WAIT = 500;

  public queue:SongModel[] = [];

  private closeStream = () => {
    this.stream.unpipe(this.speaker);

    // Hack to avoid speaker audio ring buffer error
    setTimeout(() => this.speaker.close(), this.SPEAKER_CLOSE_WAIT);
  }

  private handleSpeakerClose = () => {
    logger('# Speaker closed...')
    this.speaker.end();
  }

  private getFFmpegStream = (stream:any) =>
    ffmpeg(stream)
      .audioFrequency(44100)
      .format('mp3')
      .on('end', () => logger('# ffmpeg finished...'));

  private playStream = (stream:any) => {
    this.decoder = new lame.Decoder();
    this.speaker = new Speaker();
    return stream
      .pipe(this.decoder)
      .on('format', () => {
        this.decoder.pipe(this.speaker);
        this.speaker.on('close', () => {
          this.handleSpeakerClose()
        });
      })
      .on('finish', () => {
        logger('# Stream finished...');
        this.closeStream();
        setTimeout(() => this.playNextSong(), 2000);
      })
  }

  private playNextSong = () => {
    this.currentSong = null;
    this.isPlaying = false;
    return this.play();
  }

  public play = async () => {
    if (this.currentSong) {
      this.resume();
    } else if (this.queue.length > 0 && !this.isPlaying) {
      const nextSong:SongModel = this.queue[0];
      const providerStream = await Provider.getSongStream(nextSong.url, nextSong.providerType);
      this.stream = this.playStream(this.getFFmpegStream(providerStream));
      this.isPlaying = true;
      this.currentSong = nextSong;
      this.queue.shift();
    } else if (this.isPlaying) {
      // return error
      logger('# Already playing a song mofo');
    } else {
      // return error
      logger('# Queue is empty');
    }
  }

  public resume = () => {
    logger('# Resuming song...')
    this.speaker = new Speaker();
    this.stream.pipe(this.speaker);
    this.isPlaying = true;
    this.speaker.on('close', () => {
      this.handleSpeakerClose()
    });
    logger('# Song resumed...')
  }

  public pause = async () => {
    logger('# Pausing song...')
    this.isPlaying = false;
    this.closeStream();
    logger('# Song paused...')
  }

  public add = (song:SongModel) => {
    const songURLs = this.queue.map((song) => song.url);
    // Check if song is already there
    if (!songURLs.includes(song.url)) {
      this.queue.push(song);
      return true;
    } else {
      return false;
    }
  }

  public getCurrentSong = () => {
    return this.currentSong;
  }

  public skipTrack = () => {
    this.closeStream();
    setTimeout(() => this.playNextSong(), 2000);
    logger('# Song skipped');
  }

  public increaseVolume = () => {
    loudness.getVolume((err:any, vol:any) => {
      vol += 5;
      loudness.setVolume(vol, () => {
        console.log('setted Volume to', vol)
      });
    });
  }

  public decreaseVolume = () => {
    loudness.getVolume((err:any, vol:any) => {
      vol -= 5;
      loudness.setVolume(vol, () => {
        console.log('setted Volume to', vol)
      });
    });
  }

  public removeSong = (id:number) => {
    this.queue = this.queue.splice(id, 1);
  }

  public getPlayerState = () => {
    const playerState:IPlayer = {
      isPlaying: this.isPlaying,
      volume: 50,
      currentSong: this.getCurrentSong(),
      queue: this.queue,
    }

    return playerState;
  }
}