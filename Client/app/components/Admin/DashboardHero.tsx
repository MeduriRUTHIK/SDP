import React from 'react';
import DashboardHeader from './DashboardHeader';

type Props = {};

const DashboardHero = (props: Props) => {
  return (
    <div className='dark:text-white'>
      <DashboardHeader />
      DashboardHero
    </div>
  );
};

export default DashboardHero;
