import React, { Component } from 'react';


// Utils
// Constants
// Actions
// Models
// Interfaces
// Components
import { Header } from '../pod/header/components';
// Styles
import styles from '../App.module.css';
import stylesHelpers from '../assets/css/helpers.module.css';
import queueStyles from '../pod/playlist/components/styles/PlaylistQueue.module.css';
import QueueComponent from '../pod/playlist/components/PlaylistQueue'
import PlayerContainer from '../pod/player/PlayerContainer';
import PlaylistContainer from '../pod/playlist/PlaylistContainer';

export default class HomeRouter extends Component<{}, {}> {
  render() {
    return (
      <div className={stylesHelpers.fullHeight}>
        <Header toggleAddSongModal={() => console.log('nooop')} />

        <div className={`${styles.wrapper} ${stylesHelpers.maxWidth1000} ${stylesHelpers.margin0auto}`}>
          <PlaylistContainer />
        </div>

        <PlayerContainer />
        {/*
        <div className={`${styles.addSongModal} ${stylesHelpers.clearfix} ${addSongModalVisible ? styles.visible : ''}`}>
          {addSongModalVisible && <AddSongComponent toggleAddSongModal={this.toggleAddSongModal} />}
        </div>
        */}
      </div>
    );
  }
}