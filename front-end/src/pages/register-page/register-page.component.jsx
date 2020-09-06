import React from 'react';

// components
import Title from '../../components/title/title.component';
import Register from '../../components/register/register.component';
import Tabbar from '../../components/tabbar/tabbar.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRegisterTabbar } from '../../state/tabbar/tabbar.selectors';

// ui settings
import './register-page.styles.css';
const titleSettings = {
  title: 'Register',
  button: undefined
}

// MAIN FUNCTION
const RegisterPage = ({ registerTabbar }) => {

  const { selectedTab, list } = registerTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { selectedTab === 1 && <Register /> }
  </>   
}

const mapStateToProps = createStructuredSelector({
  registerTabbar: selectRegisterTabbar
})

export default connect(mapStateToProps)(RegisterPage);