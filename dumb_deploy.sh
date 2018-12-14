#!/usr/bin/env bash
lerna bootstrap
cd jukejoint_common
yarn build
cd ..
cd jukejoint_frontend
yarn build
cd ..
cd jukejoint_streamer
yarn build
cd ..
systemctl restart shittydj
