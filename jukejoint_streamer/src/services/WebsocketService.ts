import * as router from 'koa-router';
import IPlayerState from '../../../jukejoint_common/src/interfaces/IPlayer';

export default class WebsocketService {

  private connections: router.IRouterContext[];

  public register(ws: router.IRouterContext) {

    this.connections.push(ws);
  }

  public sendMsg(state: IPlayerState) {
    const msg = JSON.stringify(state);

    this.connections = this.connections
      .filter((ctx) => ctx.websocket.OPEN === ctx.websocket.readyState)
      .map((ctx) => {
        ctx.websocket.send(msg);
        return ctx;
      });
  }
}

export const websocketInstance = new WebsocketService();
