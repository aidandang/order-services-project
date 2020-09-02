import React, { useState } from 'react';

// components
import Title from '../../components/title/title.component';
import Login from '../../components/login/login.component';
import Tabbar from '../../components/tabbar/tabbar.component';

// ui settings
import './login-page.styles.css';
const titleSettings = {
  title: 'Member Login',
  button: undefined
}
const tabbarList = [
  {
    id: 1,
    name: 'Member Information'
  }
]
const message = {
  style: '',
  text: 'Member can login choosing either Google account or Order Services account.'
}

// MAIN FUNCTION
const LoginPage = () => {

  const [active, setActive] = useState(tabbarList[0].id);

  const handleClick = (name) => {
    setActive({ active: name })
  }

  return <>
    <Title settings={titleSettings} />
    <Tabbar 
      tabbarList={tabbarList} 
      active={active} 
      handleClick={handleClick}
      message={message} 
    />
    { active === 1 && <Login /> }
  </>   
}

export default LoginPage;