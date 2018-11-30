import Provider from '../providers/Provider';
import Player from '../player/Player';

const player = Player.getInstance();

export async function addSong(ctx:any) {
  const newSong = await Provider.getSongInfo(ctx.body.songURL, ctx.body.providerType);
  if (player.add(newSong)) {
    // Redirect
  } else {
    ctx.body(JSON.stringify('Song already in list'))
  }
}

export async function pauseSong(ctx:any) {
  await player.pause();
  ctx.status = 200;
}

export async function playSong(ctx:any) {
  await player.play();
  ctx.status = 200;
}

export async function getCurrentSong(ctx:any) {
  const currentSong = player.getCurrentSong();
  if (currentSong) {
    // send PlayerObject on WS
  } else {
    ctx.status = 204;
  }
}

export async function increaseVolume(ctx:any) {
  player.increaseVolume();
  ctx.status = 200;
}

export async function decreaseVolume(ctx:any) {
  player.decreaseVolume();
  ctx.status = 200;
}
