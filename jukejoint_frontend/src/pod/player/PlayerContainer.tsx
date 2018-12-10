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
import { PlayerService } from '../../services/PlayerService';
import { instance as SocketInstance } from '../../services/WebsocketService';

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
    if (isPlaying) {
      PlayerService.getInstance().pause();
    } else {
      PlayerService.getInstance().play();
    }

    this.setState({
      isPlaying: !isPlaying
    }, () => {

    });
  }

  public render() {
    const currentSongTitle = (SocketInstance.playerState && SocketInstance.playerState.currentSong && SocketInstance.playerState.currentSong.title) ? SocketInstance.playerState.currentSong.title : '';
    const { isPlaying } = this.state;

    return (
      <div className={`${stylesHelpers.clearfix} ${styles.wrapper}`}>
        <div className={styles.playPauseBtn} onClick={this.togglePlayPause}>
          {isPlaying ? <IcoPause className={styles.ico} /> : <IcoPlay className={styles.ico} />}
        </div>
        <div className={styles.songInfo}>
          {currentSongTitle}
        </div>
        <PlayerVolume />
        <PlayerDuration />
      </div>
    );
  }
}
export default PlayerContainer;