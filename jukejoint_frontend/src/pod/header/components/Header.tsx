import React, { Component } from 'react';
import styles from './styles/Header.module.css';
import stylesHelpers from '../../../assets/css/helpers.module.css'
import Logo from '../../../assets/img/logo-gray.png';
import { ReactComponent as IcoPlus } from '../../../assets/img/ico/ico-plus.svg';

interface IProps {
  toggleAddSongModal: () => void;
}

class HeaderComponent extends Component<IProps, any> {

  public render() {
    return (
      <div className={styles.header}>
        <div className={`${styles.logo} ${stylesHelpers.textCenter}`}>
          SHITTY<img src={Logo} className={styles.logoImg} alt="Pie of poo" /><span className={stylesHelpers.font700}>DJ</span>
        </div>
        <div className={`${stylesHelpers.maxWidth1000} ${stylesHelpers.margin0auto}`}>
          <h2 className={stylesHelpers.clearfix}>
            Upcoming
            <IcoPlus className={styles.h2ico} onClick={this.props.toggleAddSongModal} />
          </h2>
        </div>
      </div>
    );
  }
}
export default HeaderComponent;