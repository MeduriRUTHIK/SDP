'use client';
import React, { FC, useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography } from '@mui/material';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleAltOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from './Icon';

import { HiOutlineUserCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon}>
      <Typography className='!text-[16px] !font-Poppins'>
        {title}
        <Link href={to} />
      </Typography>
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | any>('Dashboard');
  const { theme, setTheme } = useTheme();

  const logoutHandler = () => {
    console.log('Logout');
  };

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${theme === 'dark' ? '#111c43 !important' : '#fff !important'}`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item-active': {
          color: '#6870fa !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
          opacity: 1,
        },
        '& .pro-menu-item': {
          color: `${theme !== 'dark' && '#000'}`,
        },
      }}
      className='!bg-white dark:bg-[#111c43]'
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: isCollapsed ? '0%' : '16%',
        }}
      >
        <Menu iconShape='square'>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}
          >
            {!isCollapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <Link href='/'>
                  <h3 className='text-[25px] font-Poppins uppercase dark:text-white text-black'>LMS</h3>
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className='inline-block'>
                  <ArrowBackIosIcon className='text-black dark:text-[#ffffffc1]' />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                {user.avatar ? (
                  <Image
                    alt='profile-user'
                    width={100}
                    height={100}
                    src={user.avatar.url}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '50%',
                      border: '3px solid #0ea5dc',
                    }}
                  />
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className='cursor-pointer dark:text-blue-500 text-crimson font-[400] w-[40px] h-[40px] 800px:w-[30px] 800px:h-[30px] rounded-full'
                  />
                )}
              </Box>
              <Box textAlign='center'>
                <Typography variant='h4' className='!text-[20px] text-black dark:text-[#ffffffc1]'>
                  {user?.name}
                </Typography>
                <Typography variant='h6' className='!text-[20px] text-black dark:text-[#f5f5f55c] capitalize'>
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/admin'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Data'}
            </Typography>
            <Item title='User' to='/admin/users' icon={<GroupsIcon />} selected={selected} setSelected={setSelected} />

            <Item
              title='Invoices'
              to='/admin/invoices'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 20px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Content'}
            </Typography>

            <Item
              title='Create Course'
              to='/admin/create-course'
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Live Courses'
              to='/admin/courses'
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 20px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Customization '}
            </Typography>

            <Item title='Hero' to='/admin/hero' icon={<WebIcon />} selected={selected} setSelected={setSelected} />
            <Item title='FAQ' to='/admin/faq' icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
            <Item
              title='Categories'
              to='/admin/categories'
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 20px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Controllers '}
            </Typography>

            <Item
              title='Manage Team'
              to='/admin/team'
              icon={<PeopleAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 25px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Analytics '}
            </Typography>

            <Item
              title='Course Analytics'
              to='/admin/course-analytics'
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Orders Analytics'
              to='/admin/orders-analytics'
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Users Analytics'
              to='/admin/users-analytics'
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant='h5'
              sx={{ m: '15px 0 5px 20px' }}
              className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
              {!isCollapsed && 'Extras '}
            </Typography>

            <Item
              title='Settings'
              to='/admin/settings'
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div onClick={() => logoutHandler()}>
              <Item
                title='Logout'
                to='/admin/logout'
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;