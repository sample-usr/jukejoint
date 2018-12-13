import { IRouterContext } from 'koa-router';
import { IPlayer } from '@jukejoint/common/lib/interfaces';

class WebsocketService {
  private connections:IRouterContext[] = [];

  public register(ws:IRouterContext) {
    this.connections.push(ws);
  }

  public sendMsg(state:IPlayer) {
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
