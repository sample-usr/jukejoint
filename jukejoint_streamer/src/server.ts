import * as Router from 'koa-router';
const koa = require('koa');
const cors = require('@koa/cors');
const websockify = require('koa-websocket');

// Utils
// Constants
import { API_URL, API_PORT, slinkURL } from '@jukejoint/common/lib/util/const';
// Services
import { websocketInstance } from './services/WebsocketService';
// Models
// Interfaces
// Controllers
import {
	WebsocketController,
	PlayerController,
} from './controllers';

const app  = new koa();
const ws 	 = new Router();
const http = new Router();

websockify(app);
const koaOptions = {
	origin: '*',
};

ws.get(API_URL.WS_CONN, WebsocketController.register);
http.post(API_URL.ADD_SONG, PlayerController.addSong)
http.get(API_URL.PAUSE_SONG, PlayerController.pauseSong)
http.get(API_URL.PLAY, PlayerController.playSong)
http.get(API_URL.GET_CURRENT_SONG, PlayerController.getCurrentSong)
http.get(API_URL.INCREASE_VOLUME, PlayerController.increaseVolume)
http.get(API_URL.DECREASE_VOLUME, PlayerController.decreaseVolume)
http.get(slinkURL, PlayerController.skipSong)

// app.use(bodyParser());
app.use(cors(koaOptions));
app.use(http.routes()).use(http.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(API_PORT);

console.log(`Server running on port ${API_PORT}`);
