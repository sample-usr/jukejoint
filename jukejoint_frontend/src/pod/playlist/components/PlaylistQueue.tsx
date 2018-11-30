import React, { Component } from 'react';
import styles from './styles/PlaylistQueue.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'

interface IProps {
  description?: string;
  id: string;
  img: string;
  title: string;
}

class PlaylistQueue extends Component<IProps, any> {
  public render() {
    const { description, id, img, title } = this.props;

    return (
      <li>
        <div className={stylesHelpers.clearfix}>
          <div className={styles.songImgWrapper}>
            <img src={img} />
          </div>
          <div className={styles.songText}>
            <h3 className={styles.songName}>{title}</h3>
            {description && <p className={styles.songDesc}>{description}</p>}
          </div>
        </div>
      </li>
    );
  }
}

export default PlaylistQueue;