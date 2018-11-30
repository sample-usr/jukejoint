import { PROVIDERS } from "../util/const";

interface ISong {
  id: string;
  title: string;
  artist: string;
  artWork: string;
  url: string;
  providerType: PROVIDERS
}

interface IPlayerState {
  volume: number;
  currentSongId: string;
  playlist: Record<string, ISong>;
}

export default IPlayerState;