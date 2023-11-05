'use client';
import Heading from '../utils/Heading';
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar';
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from '../components/Admin/DashboardHero';
import { useSelector } from 'react-redux';
import AllUsers from '../components/Admin/Users/AllUsers';

type Props = {};

const page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <AdminProtected>
        <Heading title='Admin | LMS' description='Lms admin dashboard' keywords='lms' />
        <div className='flex h-[200vh]'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar />
          </div>
          <div className='w-[85%]'>
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
