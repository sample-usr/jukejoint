
import * as React from 'react';
import { PlaylistQueue, PlaylistAddModal } from './components'
import queueStyles from './components/styles/PlaylistQueue.module.css';
import TestImg from '../../assets/img/test-img.jpg';
import { ReactComponent as IcoPlus } from '../../assets/img/ico/ico-plus.svg';
import stylesHelpers from '../../assets/css/helpers.module.css';
import styles from './PlaylistContainer.module.css';

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
        return (
            <React.Fragment>
                <div className={`${stylesHelpers.maxWidth1000} ${stylesHelpers.margin0auto}`}>
                    <h2 className={stylesHelpers.clearfix}>
                        Upcoming
                        <IcoPlus className={styles.h2ico} onClick={this.toggleAddSongModal} />
                    </h2>
                </div>

                <ul className={queueStyles.list}>
                    <PlaylistQueue
                        id="asd"
                        title="test title"
                        description="Description??"
                        img={TestImg}
                    />
                </ul>

                <div className={`${styles.addSongModal} ${stylesHelpers.clearfix} ${addSongModalVisible ? styles.visible : ''}`}>
                    {addSongModalVisible && <PlaylistAddModal toggleAddSongModal={this.toggleAddSongModal} />}
                </div>
            </React.Fragment>
        );
    }
}

export default PlaylistContainer;