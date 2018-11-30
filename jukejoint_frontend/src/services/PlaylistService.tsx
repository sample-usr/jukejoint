import axios from 'axios';
import { apiRequest } from '../toolkit/util/api';
import { API_METHOD_TYPE } from '../toolkit/const/api';

export class PlaylistService {
    private static instance:PlaylistService;
    private readonly api: string;

    private constructor() {
        this.api = 'http://localhost:4004';

    }
    public static getInstance() {
      if (!PlaylistService.instance) {
          PlaylistService.instance = new PlaylistService();
      }
      return PlaylistService.instance;
    }

    // playlist should be blob from file that has 1 link per line
    createPlaylist = async (playlist: Blob, name: string) => {
      if (playlist == null) {
        console.error('files is empty');
        return;
      }

      if (name == null) {
        console.error('name is empty');
        return;
      }

      const data = new FormData();
      data.append('files', playlist);
      data.append('name', name);
      // data.append('mimetype', 'text/plain');

      const res = await apiRequest(this.api + '/createPlaylist', API_METHOD_TYPE.POST, data);
      
      console.log('hello createPlaylist:', res);
      
      return res;
    }

    getPlaylists = async () => {
      const res = await apiRequest(this.api + '/getCurrentSong', API_METHOD_TYPE.GET);

      console.log('getCurrentSong request:', res);

      return res; 
    }

    getCurrentSong = async () => {
      const res = await apiRequest(this.api + '/getCurrentSong', API_METHOD_TYPE.GET);

      console.log('getCurrentSong request:', res);

      return res;
    }

    upvote = async (songUrl: string) => {
      const res = await apiRequest(`${this.api}'/upvote/?song-url=${songUrl}`, API_METHOD_TYPE.PATCH);

      console.log('upvote request:', res);

      return res;
    }

    downvote = async (songUrl: string) => {
      const res = await apiRequest(`${this.api}'/downvote/?song-url=${songUrl}`, API_METHOD_TYPE.PATCH);

      console.log('downvote request:', res);

      return res;
    }

}