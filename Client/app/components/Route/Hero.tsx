'use client';
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

import CustomParticles from '../../utils/CustomParticles';

const Hero = () => {
  return (
    <section className='lg:py-16 mt-14'>
      <CustomParticles />
      <div className='px-[8vw]'>
        <div className='grid grid-cols-1 sm:grid-cols-12'>
          <div className='col-span-8 place-self-center text-center sm:text-left justify-self-start relative'>
            <h1 className='mb-4 text-3xl sm:text-5xl lg:text-[90px] font-extrabold'>
              <span className='text-transparent bg-clip-text bg-gradient-to-r dark:from-sky-300 dark:to-sky-600 font-Poppins from-[#ff512f] to-[#dd2476]'>
                Unlock Your
                <br />
                <span className='dark:text-white'>
                  <TypeAnimation
                    sequence={['Skills', 1500, 'Talents', 1500, 'Passion', 1500, 'Interests', 1500]}
                    wrapper='span'
                    speed={30}
                    repeat={Infinity}
                  />
                </span>
                <br />
                In Journey With LMS
              </span>
              <br />
            </h1>
            <Image
              src='/assets/patta.png'
              width={80}
              height={80}
              alt='patta'
              className='absolute top-[-8px] lg:right-52 right-1 glow-animation'
            />
            <p className='dark:text-[#ADB7BE] text-[#010101] text-base sm:text-lg lg:text-[21px] py-8 font-Jossfin'>
              We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them.
            </p>
            <div className='flex items-center'>
              <Image
                src='/assets/client-1.jpg'
                width={40}
                height={40}
                alt='hero'
                className='rounded-full cursor-pointer hover:scale-125 duration-500'
              />
              <Image
                src='/assets/client-2.jpg'
                width={40}
                height={40}
                alt='hero'
                className='rounded-full ml-[-10px] cursor-pointer hover:scale-125 duration-500'
              />
              <Image
                src='/assets/client-3.jpg'
                width={40}
                height={40}
                alt='hero'
                className='rounded-full ml-[-10px] cursor-pointer hover:scale-125 duration-500 ease-in-out'
              />
              <p className='font-Jossfin dark:text-[#edfff4] text-[#000000b3] pl-5 lg:text-[18px] font-[600] text-[16px] '>
                100+ People already trusted us.
              </p>
            </div>
          </div>
          <div className='col-span-4 place-self-center mt-4 lg:mt-4 mr-[40px] relative'>
            <div className='image-with-animation relative'>
              <Image src='/assets/hero.png' alt='hero' width={400} height={400} className='lg:mb-32 lg:ml-10 z-10' />
              <div className='800px:h-[450px] 800px:w-[450px] w-[300px] h-[300px] rounded-full hero_animation absolute top-0 left-0'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
