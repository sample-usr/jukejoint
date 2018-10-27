import * as ytdl from 'ytdl-core';
import YoutubeResponse from '../../models/dto/youtubeResponse';
import { IProvider } from '../../interfaces';

export default class YoutubeProvider implements IProvider {

  private constructor() {};
  private static instance:YoutubeProvider;

  static getInstance = () => {
    if (!YoutubeProvider.instance) {
      YoutubeProvider.instance = new YoutubeProvider();
    }
    return YoutubeProvider.instance;
  }

  public getSongStream = async (url:string) => {
    return ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
  }

  public getSongInfo  = async (url: string): Promise<YoutubeResponse> => {
    const infos = await ytdl.getInfo(url);
    return new YoutubeResponse(infos);
  }

  public isValidURL = async (url:string) => {
    try {
      const isValid = await ytdl.validateURL(url); // validateURL returns a boolean value
      return Promise.resolve(isValid);
    }
    catch {
      return Promise.resolve(false);
    }
  }
}