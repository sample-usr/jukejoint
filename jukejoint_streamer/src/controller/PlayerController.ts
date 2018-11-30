import Provider from '../providers/Provider';
import Player from '../player/Player';
import { websocketInstance } from '../services/WebsocketService';
const parser = require('co-body');
const player = Player.getInstance();


export async function addSong(ctx:any) {
  // console.log(ctx.request.body);
  const request = await parser.json(ctx);

  console.log(request);
  const newSong = await Provider.getSongInfo(request.songURL, request.providerType);
  if (player.add(newSong)) {
    websocketInstance.sendMsg(player.getPlayerState())
    ctx.status = 200;
  } else {
    ctx.body = JSON.stringify('Song already in list');
  }
}

export async function pauseSong(ctx:any) {
  await player.pause();
  websocketInstance.sendMsg(player.getPlayerState());
  ctx.status = 200;
}

export async function playSong(ctx: any) {
  await player.play();
  websocketInstance.sendMsg(player.getPlayerState());
  ctx.status = 200;
}

export async function getCurrentSong(ctx: any) {
  const currentSong = player.getCurrentSong();
  if (currentSong) {
    websocketInstance.sendMsg(player.getPlayerState());
  } else {
    ctx.status = 204;
  }
}

export async function increaseVolume(ctx: any) {
  player.increaseVolume();
  websocketInstance.sendMsg(player.getPlayerState());
  ctx.status = 200;
}

export async function decreaseVolume(ctx: any) {
  player.decreaseVolume();
  websocketInstance.sendMsg(player.getPlayerState());
  ctx.status = 200;
}
