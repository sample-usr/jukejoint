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

export default class HomeRouter extends Component<{}, {}> {
  render() {
    return (
      <div className={stylesHelpers.fullHeight}>
        <Header toggleAddSongModal={() => console.log('nooop')}/>

        {/* <div className={`${styles.wrapper} ${stylesHelpers.maxWidth1000} ${stylesHelpers.margin0auto}`}>
          <ul className={queueStyles.list}>
            <QueueComponent
              id="asd"
              title="test title"
              description="Description??"
              img={TestImg}
            />
          </ul>
        </div>
        <FooterComponent />
        <div className={`${styles.addSongModal} ${stylesHelpers.clearfix} ${addSongModalVisible ? styles.visible : ''}`}>
          {addSongModalVisible && <AddSongComponent toggleAddSongModal={this.toggleAddSongModal} />}
        </div> */}
      </div>
    );
  }
}