import * as router from 'koa-router';
import IPlayerState from '../../../jukejoint_common/src/interfaces/IPlayer';

export default class WebsocketService {

  private connections: router.IRouterContext[];

  public register(ws: router.IRouterContext) {

    this.connections.push(ws);
  }

  public sendMsg(state: IPlayerState) {

    this.connections = this.connections.filter((connection) => connection.websocket.OPEN === connection.websocket.readyState);

    this.connections.forEach((connection) => {

      connection.websocket.send(JSON.stringify(state));
    })
  }
}

export const websocketInstance = new WebsocketService();