const koa = require('koa');
const router = require('koa-router');
const websockify = require('koa-websocket');

const app  = new koa();
const ws 	 = new router();
const http = new router();

websockify(app);

ws.get('/ping', async (ctx:any) => {
	ctx.websocket.on('message', (message:any) => {
		console.log(message);
		ctx.websocket.send("asdf" + message);
	})
});

http.get('/hello', (ctx:any, next:any) => {
	ctx.body = 'Hello world baby!';
});

app.use(http.routes()).use(http.allowedMethods());
app.ws.use(ws.routes()).use(ws.allowedMethods());

app.listen(4004);

console.log('Server running on port 4004');