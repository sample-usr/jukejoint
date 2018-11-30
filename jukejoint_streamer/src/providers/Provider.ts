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
    console.log(type);
    switch (type) {
      case PROVIDERS.YOUTUBE:
        return YoutubeProvider.getInstance();
      case PROVIDERS.BANDCAMP:
        return BandcampProvider.getInstance();
      default:
        return null;
    }
  }

  static getSongInfo = async (url:string, type:PROVIDERS): Promise<SongModel> => {
    //TODO: put try catch
    const provider = Provider.getProviderByType(type);
    console.log(provider);
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