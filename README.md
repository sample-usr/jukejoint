## Intro
The project is a mono-repo setup managed by `lernajs` and has the following packages:
1. @jukejoint/common (*models and other shared util methods*)
2. @jukejoint/frontend (*frontend ui*)
3. @jukejoint/streamer (*koa backend with streaming*)

## DEV Setup

Run `yarn start` at the root of the repository. This will start all three packages in watch mode.

> You have to have `ffmpeg` installed on your OS for `@jukejoint/streamer` to work

## Contributing

To submit code just branch off from latest `master` and do a pull request.
> Pushing directly to `master` branch is protected

When doing commit messages it's nice that you use emoticons because life is too short not too.

Though you can be creative it's good to have a standard. Here are some to follow:

* :art: `:art:` - Improving strucutre/format of the code
* :zap: `:zap:` - General enchancements
* :bug: `:bug:` - Bug fixes
* :ambulance: `:ambulance:` - Hot fixes that are pushed to production in out of release cycle way
* :sparkles: `:sparkles:` - New features
* :construction: `:construction:` - Work in progress and most probably not stable
* :arrow_up: `:arrow_up:` - Upgarding packages etc
* :handshake: `:handshake:` - Merging
* :rocket: `:rocket:` - Deploying stuff
* :wrench: `:wrench:` - Development environment or process related commits
* :cop: `:cop:` - Adding tests
* :recycle: `:recycle:` - Refactoring code
* :memo: `:memo:` - Writing docs
* :lipstick: `:lipstick:` - UI/UX and style changes
