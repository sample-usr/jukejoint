import React, { Component } from 'react';
import styles from '../styles/PlayerYoutubeSearch.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'
import { PlaylistQueue } from './';
import PlaylistQueueStyles from '../styles/PlaylistQueue.module.css';
import { PlayerService } from '../../../services';
import { PROVIDERS } from '@jukejoint/common/lib/util/const';
import { ReactComponent as IcoSearch } from '../../../assets/img/ico/ico-search.svg';

interface IState {
  searchText: string;
  searchRes: null | ISearchResult[];
}

interface IProps {
  toggleAddSongModal: () => void;
  setLoading: (v:boolean) => void;
}

interface ISearchResult {
  id: ISearchId;
  snippet: ISearchSnippet;
}

interface ISearchId {
  videoId: string;
}

interface ISearchSnippet {
  description: string;
  thumbnails: ISearchThumbnail;
  title: string;
}

interface ISearchThumbnail {
  default: ISearchThumbnailDetail
}

interface ISearchThumbnailDetail {
  height: number;
  url: string;
  width: number;
}

class PlaylistYoutubeSearch extends Component<IProps, IState> {

  searchField: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      searchText: '',
      searchRes: null
    };
  }

  public componentDidMount() {
    this.searchField.focus();
  }

  private submiFormSearchYoutube = () => {
    const { searchText } = this.state;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=viewCount&q=${searchText}&fields=items(id%2FvideoId%2Csnippet(description%2Cthumbnails%2Fdefault%2Ctitle))&key=AIzaSyA-peAPxzMqXOY5B9lokyP_H91og7pPZXg`)
      .then(response => response.json())
      .then(data => {
        // FILTER ONLY RESULTS, WHICH HAS ITEM.ID
        this.setState({
          searchRes: data.items.filter((i: ISearchResult) => (i.id))
        });
      });
  }

  public addSongToPlaylist = async (link: string) => {
    this.props.setLoading(true);
    const res = await PlayerService.getInstance().queueSong(link, PROVIDERS.YOUTUBE);
    if (res.status === 200) {
      this.props.toggleAddSongModal();
    }
  }

  private addButtonOnClick = (e: React.FormEvent) => {
    e.preventDefault();

    const { searchText } = this.state;
    const pattern = /^((http|https):\/\/)/;

    if(pattern.test(searchText)) {
      this.addSongToPlaylist(searchText);
    }else{
      this.submiFormSearchYoutube();
    }
  }

  public render() {
    const { searchText, searchRes } = this.state;

    return <React.Fragment>
      <form onSubmit={this.addButtonOnClick} className={stylesHelpers.clearfix}>
        <input
          type="search"
          className={styles.input}
          value={searchText}
          onChange={e => this.setState({ searchText: e.currentTarget.value })}
          placeholder="Search YouTube / Paste link"
          ref={r => this.searchField = r}
        />
        <button
          type="submit"
          className={`${styles.btn} ${styles.btn}`}
          onClick={this.addButtonOnClick}
          disabled={!searchText}
        >
          <IcoSearch />
        </button>
      </form>
      {searchRes && searchRes.length !== 0 &&
        <ul className={PlaylistQueueStyles.list}>
          {searchRes.map((item) =>
            <PlaylistQueue
              key={item.id.videoId}
              description={item.snippet.description}
              id={item.id.videoId}
              img={item.snippet.thumbnails.default.url}
              title={item.snippet.title}
              onClick={this.addSongToPlaylist}
            />
          )}
        </ul>
      }
      {searchRes && searchRes.length === 0 && <p className={PlaylistQueueStyles.noResults}>No results</p>}
    </React.Fragment>;
  }
}

export default PlaylistYoutubeSearch;
