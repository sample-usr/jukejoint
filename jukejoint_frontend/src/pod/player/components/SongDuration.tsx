import React, { Component } from 'react';
import styles from '../styles/SongDuration.module.css';
import { SongModel } from '@jukejoint/common/lib/models';

interface IProps {
  // duration: number;
  currentSong?: SongModel;
  isPlaying: boolean
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
    console.log("Unmounting SongDuration...");
    clearInterval(this.interval!);
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {

    if (nextState.currentTime != this.state.currentTime) {
      return true
    }
    
    if ((this.props.currentSong != null && nextProps.currentSong == null) ||
        (this.props.currentSong == null && nextProps.currentSong != null) ||
        (this.props.currentSong && nextProps.currentSong) && this.props.currentSong.url != nextProps!.currentSong!.url) {
          console.log("song changed, resetting timer");
          // song changed, reset time
          this.resetTime();
          if (nextProps.currentSong != null) {
            this.play(+nextProps!.currentSong!.duration);
          }
          return true;
    }
    if (this.props.currentSong != null) {
      if (nextProps.isPlaying == false) {
        this.pause() 
      }
      return true;
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
          this.setState({ currentTime: this.state.currentTime+1})
        }
      }, 1000);
  }

  resetTime() {
    clearInterval(this.interval!);
    this.setState({ currentTime: 0});
  }

  render() {
    if (this.props.currentSong) {
      const currentTime = this.secondsToMinutesAndSeconds(this.state.currentTime);
      const songDurationParsed = this.secondsToMinutesAndSeconds(+this.props.currentSong.duration)
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

export default SongDuration;