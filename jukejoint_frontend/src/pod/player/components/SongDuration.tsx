import React, { Component } from 'react';
import styles from '../styles/SongDuration.module.css';
import { SongModel } from '@jukejoint/common/lib/models';

interface IProps {
  currentSong?: SongModel;
  isPlaying: boolean
}

class SongDuration extends Component<IProps> {
  render() {
    if (this.props.currentSong) {
      const currentTime = this.secondsToMinutesAndSeconds(this.props.currentSong.currentDuration);
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