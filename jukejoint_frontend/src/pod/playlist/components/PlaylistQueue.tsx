import React, { Component } from 'react';
import styles from '../styles/PlaylistQueue.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'
import { throws } from 'assert';

interface IProps {
  description?: string;
  id: string;
  img: string;
  title: string;
  onClick?: (songId: string) => void;
}

class PlaylistQueue extends Component<IProps, any> {

  private onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  }

  public render() {
    const { description, img, title } = this.props;

    return (
      <li onClick={this.onClick}>
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