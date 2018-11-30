import React, { Component } from 'react';
import styles from './styles/PlayerDuration.module.css';

class SongDuration extends Component {

  render() {
    return (
      <React.Fragment>
        <div className={styles.time}>3:47 / 4:20</div>
        <div className={styles.bar} style={{ width: '64%' }} />
      </React.Fragment>
    );
  }
}

export default SongDuration;