'use client'
import React, { FC, useState } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Route/Hero';
import Courses from './components/Courses/Courses';

interface Props {

};

const Page: FC<Props> = (Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");
  
  return (
    <div>
      <Heading
        title='LMS'
        description='lms is a platform to learning'
        keywords='lms,learning,platform'
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <Hero />
      <Courses/>
    </div>
  );
};

export default Page;