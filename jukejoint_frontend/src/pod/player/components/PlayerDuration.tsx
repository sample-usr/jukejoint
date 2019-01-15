import React, { Component } from 'react';
import { AppContextProp, withAppContext, AppContextType } from '../../../toolkit/util/AppContext';
import styles from '../styles/PlayerDuration.module.css';
import { debug } from 'util';
import { SongModel } from '@jukejoint/common/lib/models';

interface IProps extends AppContextProp {
  // interval: NodeJS.Timer
  // currentCount: number;
  appContext: AppContextType;
}

interface IState {
  currentTime: number;
  songDuration: number;
}

class SongDuration extends Component<IProps, IState> {
  private interval?: NodeJS.Timeout;
  
  constructor(props:any) {
    super(props);
    this.state = {
      currentTime: 0,
      songDuration: 0
    }
  }



  componentWillUnmount() {
    console.log("Unmounting PlayerDuration...");
    clearInterval(this.interval!);
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

    const player = this.props.appContext.player;
    const nextPlayer = nextProps.appContext.player;
    
    if (player) {
      if ((player.currentSong != null && nextPlayer!.currentSong == null) ||
          player.currentSong == null && nextPlayer!.currentSong != null ||
          player.currentSong != nextPlayer!.currentSong) {
            console.log("song changed, resetting timer");
            // song changed, reset time
            this.resetTime();
            if (nextPlayer!.currentSong != null) {
              this.play(+nextPlayer!.currentSong!.duration);
            }
            // TODO: handle pause
            // right now, pause resets the time and pretty much fucks it up
            return true;
      }
    }
    if (nextState.currentTime != this.state.currentTime) {
      return true
    }
    return false
  }

  pause() {
    console.log("pausing...");
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  play(songDuration: number) {
      console.log("playing...");
      this.interval = setInterval(() => {
        if (songDuration > this.state.currentTime) {
          console.log("time inside interval: " +this.state.currentTime)
          this.setState({ currentTime: this.state.currentTime+1})
        }
      }, 1000);
  }

  resetTime() {
    clearInterval(this.interval!);
    this.setState({ currentTime: 0});
  }

  render() {
    if (this.props.appContext.player && this.props.appContext.player.currentSong) {
      const currentTime = this.secondsToMinutesAndSeconds(this.state.currentTime);
      const songDurationParsed = this.secondsToMinutesAndSeconds(+this.props.appContext.player.currentSong.duration)
      return (
        <React.Fragment>
          <div className={styles.time}>
          {currentTime + "/" + songDurationParsed}</div> 
          <div className={styles.bar} style={{ width: '100%' }} />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className={styles.time}></div> 
        <div className={styles.bar} style={{ width: '100%' }} />
      </React.Fragment>
    );
  }

  private secondsToMinutesAndSeconds = (songDurationInSeconds: number): string => {
    const minutes = Math.floor(songDurationInSeconds / 60);
    const seconds = +(songDurationInSeconds % 60).toFixed(0);

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}

export default withAppContext(SongDuration);