import { PROVIDERS } from '../toolkit/const';
import { YoutubeProvider, BandcampProvider } from '../providers';
import SongModel from '../models/SongModel';
import { IProvider } from '../interfaces';

export default class Provider {

  static getProviderByType = (type:PROVIDERS):IProvider => {
    switch (type) {
      case PROVIDERS.YOUTUBE:
        return YoutubeProvider.getInstance();
      case PROVIDERS.YOUTUBE:
        return BandcampProvider.getInstance();
      default:
        return null;
    }
  }

  static getSongInfo = async (url:string, type:PROVIDERS): Promise<SongModel> => {
    const provider = Provider.getProviderByType(type);
    const songInfo = await provider.getSongInfo(url);

    return SongModel.mapProviderInfos(songInfo, type, url);
  }

  static getSongStream = async (url:string, type:PROVIDERS): Promise<SongModel> => {
    const provider = Provider.getProviderByType(type);
    const songStream = await provider.getSongStream(url);

    return songStream;
  }

}