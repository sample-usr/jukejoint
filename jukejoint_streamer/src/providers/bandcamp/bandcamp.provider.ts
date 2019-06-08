// import * as bandcamp from 'node-bandcamp';

// Utils
import { jsonConvert } from '@jukejoint/common/lib/util/general';
// Constants
// Actions
// Models
import { BandcampDTO } from '@jukejoint/common/lib/models';
// Interfaces
import { IProvider } from '@jukejoint/common/lib/interfaces'

export default class BandcampProvider implements IProvider {
  private constructor() {};
  private static instance:BandcampProvider;

  static getInstance = () => {
    if (!BandcampProvider.instance) {
      BandcampProvider.instance = new BandcampProvider();
    }
    return BandcampProvider.instance;
  }

  public getSongStream = async (url: string) => {
    //TODO: put try catch
    // return await bandcamp.getTrack(url);
  }

  public getSongInfo = async (url: string): Promise<BandcampDTO> => {
    //TODO: put try catch
    // const infos = await bandcamp.getDetails(url);
    // return jsonConvert.deserialize(infos, BandcampDTO);

    return jsonConvert.deserializeObject(null, BandcampDTO);
  }

  public isValidURL = async (url:string) => {
    // Since bandcamp library doesn't have a validation method we'll use details for now
    try {
      // const isValid = await bandcamp.getDetails(url);
      const isValid = true;
      if (isValid) {
        return Promise.resolve(true);
      }
    }
    catch(err) {
      return Promise.resolve(false);
    }
  }
}