
import * as React from 'react';
import { PlaylistQueue, PlaylistAddModal } from './components'
import queueStyles from './components/styles/PlaylistQueue.module.css';
import { ReactComponent as IcoPlus } from '../../assets/img/ico/ico-plus.svg';
import stylesHelpers from '../../assets/css/helpers.module.css';
import styles from './PlaylistContainer.module.css';
import { instance as SocketInstance } from '../../services/WebsocketService';

interface IState {
    addSongModalVisible: boolean;
}

class PlaylistContainer extends React.Component<any, IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            addSongModalVisible: false
        };
    }

    public toggleAddSongModal = () => {
        const { addSongModalVisible } = this.state;
        this.setState({
            addSongModalVisible: !addSongModalVisible
        });
    }

    public render() {
        const { addSongModalVisible } = this.state;
        const queue = (SocketInstance.playerState && SocketInstance.playerState.queue) ? SocketInstance.playerState.queue : false;

        return (
            <React.Fragment>
                <div className={`${stylesHelpers.maxWidth1000} ${stylesHelpers.margin0auto}`}>
                    <h2 className={stylesHelpers.clearfix}>
                        Upcoming
                        <IcoPlus className={styles.h2ico} onClick={this.toggleAddSongModal} />
                    </h2>
                </div>

                {queue ? (
                    <ul className={queueStyles.list}>
                        {queue.map((song: any) => <PlaylistQueue id={song.url} key={song.url} title={song.title} description={`${song.artist} ${song.album}`} img={song.artWork} />)}
                    </ul>
                ) : (
                        <p>No songs in queue</p>
                    )
                }

                <div className={`${styles.addSongModal} ${stylesHelpers.clearfix} ${addSongModalVisible ? styles.visible : ''}`}>
                    {addSongModalVisible && <PlaylistAddModal toggleAddSongModal={this.toggleAddSongModal} />}
                </div>
            </React.Fragment>
        );
    }
}

export default PlaylistContainer;