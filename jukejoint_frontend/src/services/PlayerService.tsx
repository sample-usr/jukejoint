import axios from 'axios';
import { apiRequest } from '../toolkit/util/api';
import { API_METHOD_TYPE } from '../toolkit/const/api';

export class PlayerService {
    private static instance:PlayerService;
    private readonly api: string;

    private constructor() {
        this.api = 'http://localhost:4004';

    }
    public static getInstance() {
      if (!PlayerService.instance) {
          PlayerService.instance = new PlayerService();
      }
      return PlayerService.instance;
    }

    hello = async () => {
        const res = await apiRequest(this.api + '/hello');
        
        console.log('hello request:', res);
        
        return res;
    }

    play = async () => {
      const res = await apiRequest(this.api + '/play', API_METHOD_TYPE.GET);
        
      console.log('play request:', res);
        
      return res;
    }

    pause = async () => {
      const res = await apiRequest(this.api + '/pause', API_METHOD_TYPE.GET);
        
      console.log('pause request:', res);
        
      return res;
    }

    increaseVolume = async () => {
      const res = await apiRequest(this.api + '/increaseVol', API_METHOD_TYPE.GET);
        
      console.log('increaseVol request:', res);
        
      return res;
    };

    decreaseVolume = async () => {
      const res = await apiRequest(this.api + '/decreaseVol', API_METHOD_TYPE.GET);
        
      console.log('decreaseVol request:', res);
        
      return res;
    }

    getCurrentSong = async () => {
      const res = await apiRequest(this.api + '/getCurrentSong', API_METHOD_TYPE.GET);

      console.log('getCurrentSong request:', res);

      return res;
    }


}