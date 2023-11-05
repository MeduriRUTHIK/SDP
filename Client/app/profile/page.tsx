'use client';
import React, { FC, useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from '../components/Profile/Profile';
import { useSelector } from 'react-redux';

type Props = {};

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number>(5);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name} profile | LMS`}
          description='lms is a platform to learning'
          keywords='lms,learning,platform'
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default page;
