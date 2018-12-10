import React, { Component } from 'react';
import { ReactComponent as IcoClose } from '../../../assets/img/ico/ico-delete.svg';
import { PlaylistYoutubeSearch, Tabs, PlaylistAddLink } from './';
import queueStyles from './styles/PlaylistQueue.module.css';
import styles from './styles/PlaylistAddModal.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'
// import PlaylistQueue from './PlaylistQueue';

interface IProps {
    toggleAddSongModal: () => void;
}

class PlaylistAddModal extends Component<IProps, any> {

    public render() {
        return (
            <div>
                <h4 className={`${stylesHelpers.clearfix} ${styles.h4}`}>
                    Add song to queue
                    <IcoClose className={`${stylesHelpers.pointer} ${stylesHelpers.floatRight}`} onClick={this.props.toggleAddSongModal} />
                </h4>

                <Tabs titles={['Search youtube', 'Paste link', 'Choose playlist']}>
                    {/* YOUTUBE SEARCH */}
                    <PlaylistYoutubeSearch toggleAddSongModal={this.props.toggleAddSongModal} />

                    {/* PASTE LINK */}
                    <PlaylistAddLink toggleAddSongModal={this.props.toggleAddSongModal} />

                    {/* PLAYLISTS */}
                    <ul className={queueStyles.list}>
                        {/* <PlaylistQueue id="sss" title="Video title" description="say Whaaaaaat?!" img={TestImg} /> */}
                    </ul>
                </Tabs>
            </div >
        );
    }
}

export default PlaylistAddModal;
