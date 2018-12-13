import React, { Component } from 'react';
import styles from '../styles/PlaylistAddLink.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'
import { PlayerService } from '../../../services';
import { PROVIDERS } from '@jukejoint/common/lib/util/const';

interface IState {
  addSongText: string;
}

interface IProps {
  toggleAddSongModal: () => void;
}

class PlaylistAddLink extends Component<IProps, IState> {

  addSongInput: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      addSongText: ''
    };
  }

  public componentDidMount() {
    this.addSongInput.focus();
  }

  private submiFormAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    const { addSongText } = this.state;

    // TODO: better provider inferring
    const providerType = addSongText.includes('youtube') ? PROVIDERS.YOUTUBE : PROVIDERS.BANDCAMP;

    PlayerService.getInstance().queueSong(addSongText, providerType);

    this.props.toggleAddSongModal();
  }

  public render() {
    const { addSongText } = this.state;

    return (
      <form onSubmit={this.submiFormAddSong} className={stylesHelpers.clearfix}>
        <input
          type="text"
          className={styles.inputBtn}
          value={addSongText}
          onChange={e => this.setState({ addSongText: e.currentTarget.value })}
          placeholder="paste youtube/soundcloud link"
          ref={r => this.addSongInput = r}
        />
        <button
          type="submit"
          className={`${styles.inputBtn} ${styles.btn}`}
          onClick={this.submiFormAddSong}
        >
          Add to queue
          </button>
      </form>
    );
  }
}
export default PlaylistAddLink;