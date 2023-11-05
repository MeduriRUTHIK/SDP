'use client';
import React, { FC, useState } from 'react';
import SideBarProfile from './SideBarProfile';
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState<boolean>(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState<number>(1);
  const [logout, setLogout] = useState(false);

  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.screenY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className='w-[85%] flex mx-auto'>
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#52515116] rounded-[5px] dark:shadow-sm shadow-xl mt-[80px] mb-[80px] static ${
          scroll ? 'top-[120px]' : 'top-[30px]'
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className='w-full h-full bg-transparent mt-[80px]'>
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
      {active === 2 && (
        <div className='w-full h-full bg-transparent mt-[80px]'>
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

export default Profile;
