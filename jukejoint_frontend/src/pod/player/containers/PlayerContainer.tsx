import React, { Component } from 'react';

// Utils
import { AppContextProp, withAppContext } from '../../../toolkit/util/AppContext';
import { partial } from '@jukejoint/common/lib/util/general';
// Constants
// Services
import { PlayerService } from '../../../services';
// Models
// Interfaces
// Components
import { PlayerVolume, PlayerDuration } from '../components';
// Styles
import styles from '../styles/PlayerContainer.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'
import { ReactComponent as IcoPlay } from '../../../assets/img/ico/ico-play.svg';
import { ReactComponent as IcoPause } from '../../../assets/img/ico/ico-pause.svg';

type Props = AppContextProp;

class PlayerContainer extends Component<Props> {

  private togglePlayPause = (isPlaying:boolean) => {
    isPlaying ? PlayerService.getInstance().pause() : PlayerService.getInstance().play();
    this.props.appContext.setLoading(true);
  }

  public render() {
    const { player } = this.props.appContext;
    if (player) {
      return (
        <div className={`${stylesHelpers.clearfix} ${styles.wrapper}`}>
          <div className={styles.playPauseBtn} onClick={partial(this.togglePlayPause, [player.isPlaying])}>
            {player.isPlaying ? <IcoPause className={styles.ico}/> : <IcoPlay className={styles.ico}/>}
          </div>
          {player.currentSong &&
            <div className={styles.songInfo}>
              {`${player.currentSong.title}`}
            </div>
          }
          <PlayerVolume/>
          <PlayerDuration/>
        </div>
      );
    } else {
      return null;
    }
  }
}
export default withAppContext(PlayerContainer);