import React, { Component } from 'react';

// Utils
import { AppContextProp, withAppContext } from '../../../toolkit/util/AppContext';
import { isEmpty } from '@jukejoint/common/lib/util/general';
// Constants
// Actions
// Models
import { SongModel } from '@jukejoint/common/lib/models';
// Interfaces
import { IPlayer } from '@jukejoint/common/lib/interfaces';
// Components
import {
  PlaylistQueue,
  PlaylistAddModal
} from '../components'
// Styles
import queueStyles from '../styles/PlaylistQueue.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css';
import { ReactComponent as IcoPlus } from '../../../assets/img/ico/ico-plus.svg';
import styles from '../styles/PlaylistContainer.module.css';

type Props = AppContextProp;

type State = {
  addSongModalVisible: boolean;
}

class PlaylistContainer extends React.Component<Props, State>{
  readonly state: State = {
    addSongModalVisible: false,
  }

  toggleAddSongModal = () =>
    this.setState({ addSongModalVisible: !this.state.addSongModalVisible })

  renderPlaylist = (player: IPlayer | undefined) => {
    return (player && !isEmpty(player.queue)) ? (
      <ul className={queueStyles.list}>
        {player.queue.map(
          (song: SongModel) =>
            <PlaylistQueue
              key={song.url}
              id={song.url}
              title={song.title}
              description={song.artist}
              img={song.artWork} />
        )}
      </ul>
    ) : (
        <div>No songs in queue</div>
      )
  }

  render() {
    const { addSongModalVisible } = this.state;
    const { player } = this.props.appContext;
    return (
      <React.Fragment>
        <div className={`${stylesHelpers.appWrapper} ${stylesHelpers.margin0auto}`}>
          <h2 className={stylesHelpers.clearfix}>
            Upcoming songs
            <IcoPlus className={styles.h2ico} onClick={this.toggleAddSongModal} />
          </h2>
        </div>
        {this.renderPlaylist(player)}
        <div
          className={`${styles.addSongModal} ${stylesHelpers.clearfix} ${addSongModalVisible ? styles.visible : ''}`}>
          {addSongModalVisible && <PlaylistAddModal toggleAddSongModal={this.toggleAddSongModal} />}
        </div>
      </React.Fragment>
    );
  }
}

export default withAppContext(PlaylistContainer);