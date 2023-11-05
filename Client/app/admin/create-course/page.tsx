'use client';
import React from 'react';
import CreateCourse from '../../components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import Heading from '@/app/utils/Heading';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading title='LMS admin' description='lms' keywords='lms' />

      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
