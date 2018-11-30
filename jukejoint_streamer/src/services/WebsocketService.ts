export default class WebsocketService {
  private static instance:WebsocketService;
  private wsContext:any;
  private constructor(ctx:any) {
    WebsocketService.instance.wsContext = ctx;
  }

  static getInstance(ctx:any) {
    if (!WebsocketService.instance) {
      WebsocketService.instance = new WebsocketService(ctx);
    }
    return WebsocketService.instance;
  }
}