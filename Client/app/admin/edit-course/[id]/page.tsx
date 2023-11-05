'use client';
import React from 'react';
import CreateCourse from '../../../components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import Heading from '@/app/utils/Heading';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import EditCourse from '../../../components/Admin/Course/EditCourse';

type Props = {};

const page = ({ params }: any) => {
  const id = params.id;
  return (
    <div>
      <Heading title='LMS admin' description='lms' keywords='lms' />

      <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHeader />
          {/* <CreateCourse /> */}
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
