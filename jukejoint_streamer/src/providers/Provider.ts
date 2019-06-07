// Utils
// Constants
import { PROVIDERS } from '@jukejoint/common/lib/util/const';
import { YoutubeProvider, BandcampProvider } from '../providers';
// Actions
// Models
import { SongModel } from '@jukejoint/common/lib/models';
// Interfaces
import { IProvider } from '@jukejoint/common/lib/interfaces';

export default class Provider {

  static getProviderByType = (type:PROVIDERS):IProvider => {
    switch (type) {
      case PROVIDERS.YOUTUBE:
        return YoutubeProvider.getInstance();
      case PROVIDERS.BANDCAMP:
        return BandcampProvider.getInstance();
      default:
        return null;
    }
  }

  static getProviderByURL = (url:string):IProvider => {
    const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const youtubeMatch = url.match(youtubeRegExp);
    const bandcampRegExp = /^.*bandcamp.*/;
    const bandcampMatch = url.match(bandcampRegExp);

    if (youtubeMatch) {
      return YoutubeProvider.getInstance();
    } else if (bandcampMatch) {
      return BandcampProvider.getInstance();
    } else {
      return null;
    }
  }

  static getSongInfo = async (url:string, type:PROVIDERS): Promise<SongModel> => {
    //TODO: put try catch
    const provider = Provider.getProviderByType(type);
    const songInfo = await provider.getSongInfo(url);

    return SongModel.buildFromProvider(songInfo, type, url);
  }

  static getSongStream = async (url:string, type:PROVIDERS): Promise<SongModel> => {
    //TODO: put try catch
    const provider = Provider.getProviderByType(type);
    const songStream = await provider.getSongStream(url);

    return songStream;
  }

}