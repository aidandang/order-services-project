import React from 'react';

// components
import Title from '../../components/title/title.component';
import Login from '../../components/login/login.component';
import Tabbar from '../../components/tabbar/tabbar.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLoginTabbar } from '../../state/tabbar/tabbar.selections';

// ui settings
import './login-page.styles.css';
const titleSettings = {
  title: 'Member Login',
  button: undefined
}

// MAIN FUNCTION
const LoginPage = ({ loginTabbar }) => {

  const { selectedTab, list, message } = loginTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar
      page='login' 
      tabbarList={list} 
      selectedTab={selectedTab}
      message={message} 
    />
    { selectedTab === 1 && <Login /> }
  </>   
}

const mapStateToProps = createStructuredSelector({
  loginTabbar: selectLoginTabbar
})

export default connect(mapStateToProps)(LoginPage);