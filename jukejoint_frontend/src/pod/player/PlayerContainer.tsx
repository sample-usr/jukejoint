import React, { Component } from 'react';

// Utils
// Constants
// Actions
// Models
// Interfaces
// Components
// Styles
import styles from './PlayerContainer.module.css';
import stylesHelpers from '../../assets/css/helpers.module.css'
import { PlayerVolume, PlayerDuration } from './components/index';
import { ReactComponent as IcoPlay } from '../../assets/img/ico/ico-play.svg';
import { ReactComponent as IcoPause } from '../../assets/img/ico/ico-pause.svg';

interface IState {
  isPlaying: boolean;
}

class PlayerContainer extends Component<any, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      isPlaying: false
    };
  }

  private togglePlayPause = () => {
    const { isPlaying } = this.state;

    this.setState({
      isPlaying: !isPlaying
    });
  }

  public render() {
    const { isPlaying } = this.state;

    return (
      <div className={`${stylesHelpers.clearfix} ${styles.wrapper}`}>
        <div className={styles.playPauseBtn} onClick={this.togglePlayPause}>
          {isPlaying ? <IcoPause className={styles.ico} /> : <IcoPlay className={styles.ico} />}
        </div>
        <div className={styles.songInfo}>
          Streetlight Manifesto - Everything Goes Numb
        </div>
        <PlayerVolume />
        <PlayerDuration />
      </div>
    );
  }
}
export default PlayerContainer;