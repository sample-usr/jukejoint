// Utils
import { apiRequest, getApiURL } from '../toolkit/util/api';
// Constants
import { API_METHOD_TYPE  } from '../toolkit/const/api';
import { PROVIDERS, API_URL } from '@jukejoint/common/lib/util/const';
// Actions
// Models
// Interfaces

export default class PlayerService {
  private static instance:PlayerService;

  public static getInstance() {
    if (!PlayerService.instance) {
        PlayerService.instance = new PlayerService();
    }
    return PlayerService.instance;
  }

  queueSong = async (songURL:string, providerType: PROVIDERS) => {
    const res = await apiRequest(getApiURL(API_URL.ADD_SONG), API_METHOD_TYPE.POST, { songURL, providerType });
    return res;
  }

  play = async () => {
    const res = await apiRequest(getApiURL(API_URL.PLAY), API_METHOD_TYPE.GET);
    return res;
  }

  pause = async () => {
    const res = await apiRequest(getApiURL(API_URL.PAUSE_SONG), API_METHOD_TYPE.GET);
    return res;
  }

  increaseVolume = async () => {
    const res = await apiRequest(getApiURL(API_URL.INCREASE_VOLUME), API_METHOD_TYPE.GET);
    return res;
  };

  decreaseVolume = async () => {
    const res = await apiRequest(getApiURL(API_URL.DECREASE_VOLUME), API_METHOD_TYPE.GET);
    return res;
  }

  getCurrentSong = async () => {
    const res = await apiRequest(getApiURL(API_URL.GET_CURRENT_SONG), API_METHOD_TYPE.GET);
    return res;
  }
}