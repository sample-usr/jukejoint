import * as Router from 'koa-router';
const koa = require('koa');
const cors = require('@koa/cors');
const websockify = require('koa-websocket');

// Utils
// Constants
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
// const PlayerController = require('./controller/PlayerController');

// ws.get('/register', async (ctx: router.IRouterContext) => {
// 	websocketInstance.register(ctx);
// });

ws.get('/register', WebsocketController.register);
http.post('/add_song', PlayerController.addSong)
http.get('/pause_song', PlayerController.pauseSong)
http.get('/play', PlayerController.playSong)
http.get('/get_current_song', PlayerController.getCurrentSong)
http.get('/increase_volume', PlayerController.increaseVolume)
http.get('/decrease_volume', PlayerController.decreaseVolume)

// app.use(bodyParser());
app.use(cors(koaOptions));
app.use(http.routes()).use(http.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(4004);

console.log('Server running on port 4004');
