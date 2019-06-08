import * as ytdl from 'ytdl-core';

// Utils
import { jsonConvert } from '@jukejoint/common/lib/util/general';
// Constants
// Actions
// Models
import { YoutubeDTO } from '@jukejoint/common/lib/models';
// Interfaces
import { IProvider } from '@jukejoint/common/lib/interfaces'

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
    //TODO: put try catch
    return ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
  }

  public getSongInfo  = async (url: string): Promise<YoutubeDTO> => {
    //TODO: put try catch
    const infos = await ytdl.getInfo(url);
    return jsonConvert.deserializeObject(infos, YoutubeDTO);
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