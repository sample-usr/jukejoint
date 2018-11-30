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

ws.get('/ping', async (ctx:any) => {
	ctx.websocket.on('message', (message:any) => {
		console.log(message);
		ctx.websocket.send("asdf" + message);
	})
ws.get('/register', async (ctx: router.IRouterContext) => {

	websocketInstance.register(ctx);
});

http.post('/add_song', PlayerController.addSong)

app.use(bodyParser());
app.use(http.routes()).use(http.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(4004);

console.log('Server running on port 4004');