export default class YoutubeResponse {
  thumbnail_url: string = ''
  title: string = '';

  constructor(obj: any) {
    this.thumbnail_url = obj.thumbnail_url;
    this.title = obj.title;
  }
}