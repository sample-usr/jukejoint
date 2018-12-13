import * as Router  from 'koa-router';

// Utils
import Player from '../player/Player';
// Constants
// Services
import { websocketInstance } from '../services/WebsocketService';
// Models
// Interfaces
// Components
// Styles

export async function register(ctx:Router.IRouterContext) {
  websocketInstance.register(ctx);
  websocketInstance.sendMsg(Player.getInstance().getPlayerState())
}