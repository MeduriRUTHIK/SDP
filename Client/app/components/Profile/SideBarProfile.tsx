import React, { FC, use } from 'react';
import Image from 'next/image';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
  return (
    <div className='w-full'>
      {/* my account */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? 'dark:bg-slate-800 bg-[#F5F5F5]' : 'bg-transparent'
        }`}
        onClick={() => setActive(1)}
      >
        {user?.avatar || avatar ? (
          <Image
            src={user.avatar.url}
            alt='user-icon'
            width={40}
            height={40}
            loading='lazy'
            className='cursor-pointer rounded-full w-[30px] h-[30px]'
          />
        ) : (
          <HiOutlineUserCircle
            size={25}
            className='cursor-pointer dark:text-blue-500 text-[crimson] font-[400] w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] rounded-full'
          />
        )}
        <h5 className='pl-[12px] 800px:block hidden font-Poppins dark:text-white text-black '>My Account</h5>
      </div>
      {/* change password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? 'dark:bg-slate-800 bg-[#F5F5F5]' : 'bg-transparent'
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className={'dark:text-white text-black'} />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black '>Change Password</h5>
      </div>
      {/* my courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? 'dark:bg-slate-800 bg-[#F5F5F5]' : 'bg-transparent'
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className={'dark:text-white text-black'} />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black '>My courses</h5>
      </div>
      {/* admin dashboard */}
      {user && user?.role === 'admin' && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 5 ? 'dark:bg-slate-800 bg-[#F5F5F5]' : 'bg-transparent'
          }`}
          href='/admin'
        >
          <MdAdminPanelSettings size={20} className={'dark:text-white text-black'} />
          <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black '>Admin Dashboard</h5>
        </Link>
      )}
      {/* logout*/}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? 'dark:bg-slate-800 bg-[#F5F5F5]' : 'bg-transparent'
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className={'dark:text-white text-black'} />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black '>Logout</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
