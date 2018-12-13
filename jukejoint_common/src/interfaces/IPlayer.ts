import { PROVIDERS } from "../util/const";
import { PlaylistModel, SongModel } from '../models';

interface ISong {
  id: string;
  title: string;
  artist: string;
  artWork: string;
  url: string;
  providerType: PROVIDERS
}

interface IPlayer {
  isPlaying:boolean;
  volume:number;
  currentSong:SongModel | undefined;
  queue:SongModel[];
}

export default IPlayer;