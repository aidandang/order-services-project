import React from 'react';

// components
import Title from '../../components/title/title.component';

// ui settings
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