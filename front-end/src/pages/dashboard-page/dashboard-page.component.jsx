import React from 'react';

// components
import Title from '../../components/title/title.component';

// ui settings
import './dashboard-page.styles.css';
const titleSettings = {
  title: 'Dashboard',
  button: undefined
}

const DashboardPage = () => {
  return <>
    <Title settings={titleSettings} />
  </>
}

export default DashboardPage;