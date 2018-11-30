const koa = require('koa');
import * as router from 'koa-router';
const websockify = require('koa-websocket');
import { websocketInstance } from './services/WebsocketService';

const app  = new koa();
const ws 	 = new router();
const http = new router();

websockify(app);

ws.get('/register', async (ctx: router.IRouterContext) => {

	websocketInstance.register(ctx);
});

http.get('/hello', (ctx:any, next:any) => {
	ctx.body = 'Hello world baby!';
});

app.use(http.routes()).use(http.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(4004);

console.log('Server running on port 4004');