import React from 'react';

// components
import Title from '../../components/title/title.component';

const DashboardPage = () => {
  const title = {
    name: 'Dashboard',
    message: 'The statistic page of Order Services.'
  }
  return <>
    <Title title={title} />
  </>
}

export default DashboardPage;