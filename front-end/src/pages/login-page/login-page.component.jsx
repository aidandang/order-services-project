import React from 'react';

// components
import Title from '../../components/title/title.component';
import Login from '../../components/login/login.component';
import Tabbar from '../../components/tabbar/tabbar.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLoginTabbar } from '../../state/tabbar/tabbar.selectors';

// ui settings
import './login-page.styles.css';
const titleSettings = {
  title: 'Member Login',
  button: undefined
}

const LoginPage = ({ loginTabbar }) => {

  const { selectedTab, list } = loginTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar
      page='login' 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { selectedTab === 1 && <Login /> }
  </>   
}

const mapStateToProps = createStructuredSelector({
  loginTabbar: selectLoginTabbar
})

export default connect(mapStateToProps)(LoginPage);