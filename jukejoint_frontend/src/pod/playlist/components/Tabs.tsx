import * as React from 'react';
import styles from './styles/Tabs.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'

interface IProps {
  children: React.ReactChild[];
  titles: string[];
}

interface IState {
  selectedIndex: number;
}

class Tabs extends React.Component<IProps, IState>{

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  private selectTab = (index: number) => {
    this.setState({
      selectedIndex: index
    });
  }

  public render() {
    const { children, titles } = this.props;
    const { selectedIndex } = this.state;
    const count = React.Children.count(this.props.children);
    return (
      <React.Fragment>
        <ul className={stylesHelpers.clearfix}>
          {titles.map((title: string, index: number) =>
            <li
              style={{ width: `${100 / count}%` }}
              key={`tabs-h-${index}`}
              className={`${styles.li} ${selectedIndex === index ? styles.active : ''}`}
              onClick={() => this.selectTab(index)}
            >
              {title}
            </li>
          )}
        </ul>
        {React.Children.map(children, (child: React.ReactChild, index: number) =>
          <div
            key={`tabs-i-${index}`}
            className={selectedIndex === index ? styles.visible : styles.hidden}
          >
            {child}
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default Tabs;
