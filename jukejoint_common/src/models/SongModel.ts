import { PROVIDERS } from '../toolkit/const';

export default class SongModel {
  title: string = '';
  artist: string = '';
  album: string = '';
  artWork: string = '';
  url: string;
  providerType: PROVIDERS;

  public static mapProviderInfos = (infos: any, providerType:PROVIDERS, url:string) => {
    const newSong = new SongModel();
    newSong.url = url;
    newSong.providerType = providerType;

    switch (providerType) {
      case PROVIDERS.BANDCAMP:
        newSong.title = infos.title;
        newSong.artist = infos.artist;
        newSong.album = infos.album;
        newSong.artWork = infos.image;
        break;

      case PROVIDERS.YOUTUBE:
        newSong.title = infos.title;
        newSong.artWork = infos.thumbnail_url;
        break;
    }
    return newSong;
  }
}