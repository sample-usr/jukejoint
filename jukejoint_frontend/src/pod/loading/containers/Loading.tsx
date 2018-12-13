import React, { Component } from 'react';

// Utils
// Constants
// Actions
// Models
// Interfaces
// Components
// Styles
import styles from '../styles/Loading.module.css';

interface IProps {
  isVisible: boolean;
}

class LoadingComponent extends Component<IProps> {
  render() {
    const { isVisible } = this.props;
    return (
      <div className={`${styles.loadingWrapper} ${isVisible ? styles.isVisible : ''}`}>
        <div className={styles.poo}>&#x1f4a9;</div>
      </div>
    );
  }
}
export default LoadingComponent;