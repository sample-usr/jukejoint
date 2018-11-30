const koa = require('koa');
import * as router from 'koa-router';
const websockify = require('koa-websocket');
const bodyParser = require('koa-bodyparser');
import { websocketInstance } from './services/WebsocketService';

const app  = new koa();
const ws 	 = new router();
const http = new router();

websockify(app);

// const PlayerController = require('./controller/PlayerController');
import { PlayerController } from './controller';

ws.get('/register', async (ctx: router.IRouterContext) => {

	websocketInstance.register(ctx);
});

http.post('/add_song', PlayerController.addSong)
http.get('/pause_song', PlayerController.pauseSong)
http.get('/play', PlayerController.playSong)
http.get('/get_current_song', PlayerController.getCurrentSong)
http.get('/increase_volume', PlayerController.increaseVolume)
http.get('/decrease_volume', PlayerController.decreaseVolume)

// app.use(bodyParser());
app.use(http.routes()).use(http.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(4004);

console.log('Server running on port 4004');
