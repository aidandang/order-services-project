import React, { useState } from 'react';

// components
import Title from '../../components/title/title.component';
import Register from '../../components/register/register.component';
import Tabbar from '../../components/tabbar/tabbar.component';

// ui settings
import './register-page.styles.css';
const titleSettings = {
  title: 'Register',
  button: undefined
}
const tabbarList = [
  {
    id: 1,
    name: 'Create a New Account'
  }
]
const message = {
  style: '',
  text: 'Only admins can create a new account.'
}

// MAIN FUNCTION
const RegisterPage = () => {

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
    { active === 1 && <Register /> }
  </>   
}

export default RegisterPage;