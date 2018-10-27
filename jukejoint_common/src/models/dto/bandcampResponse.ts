export default class BandcampResponse {
  title: string = '';
  album: string = '';
  artist: string = '';
  image: string = '';
  url: string = '';

  constructor(obj: any) {
    this.title = obj.title;
    this.album = obj.album;
    this.artist = obj.artist;
    this.image = obj.image;
    this.url = obj.url;
  }
}