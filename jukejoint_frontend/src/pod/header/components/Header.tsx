import React, { Component } from 'react';
import styles from './styles/Header.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'
import Logo from '../../../assets/img/logo-gray.png';

class HeaderComponent extends Component {

  public render() {
    return (
      <div className={styles.header}>
        <div className={`${styles.logo} ${stylesHelpers.textCenter}`}>
          SHITTY<img src={Logo} className={styles.logoImg} alt="Pie of poo" /><span className={stylesHelpers.font700}>DJ</span>
        </div>
      </div>
    );
  }
}
export default HeaderComponent;