import React, { Component } from 'react';

// Utils
// Constants
// Actions
// Models
// Interfaces
// Components
// Styles
import styles from '../styles/FourOuFour.module.css';

const text = ['E', 'a', 't', ' ', 's', 'h', 'i', 't', '<br />', 'y', 'o', 'u', ' ', 'd', 'i', 'c', 'k'];

interface IState {
  displayText: string;
}

class FourOuFour extends Component<{}, IState> {

  public constructor(props: {}) {
    super(props);
    this.state = {
      displayText: ''
    };
  }

  public componentDidMount() {
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => this.setState({ displayText: this.state.displayText + text[i] }), i * 200);
    }

  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div dangerouslySetInnerHTML={{ __html: this.state.displayText }} />
      </div>
    );
  }
}
export default FourOuFour;