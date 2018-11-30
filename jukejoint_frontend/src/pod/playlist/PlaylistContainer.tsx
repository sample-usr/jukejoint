
import * as React from 'react';
import PlaylistQueue from './components/PlaylistQueue';
import queueStyles from './components/styles/PlaylistQueue.module.css';
import TestImg from '../../assets/img/test-img.jpg';

class PlaylistContainer extends React.Component<any, any>{

    public render() {
        return (
            <ul className={queueStyles.list}>
                <PlaylistQueue
                    id="asd"
                    title="test title"
                    description="Description??"
                    img={TestImg}
                />
            </ul>
        );
    }
}

export default PlaylistContainer;