'use client';
import React, { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../../styles/style';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { signIn } from 'next-auth/react';

import { toast } from 'react-toastify';

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please enter your email!'),
  password: Yup.string().required('Please enter your password').min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);

  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logged in Successfully');
      setOpen(false);
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        console.log(errorData);
        toast.error(errorData?.data?.Message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <h1 className={`${styles.title}`}>Login With Lms</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor='email'>
          Enter Your Email
        </label>
        <input
          type='email'
          name='email'
          value={values.email}
          onChange={handleChange}
          id='email'
          placeholder='example@gmail.com'
          className={`${errors.email && touched.email && 'border-red-500'} ${styles.input}`}
        />
        {errors.email && touched.email && <span className='text-red-500 pt-2 block'>{errors.email}</span>}
        <div className='w-full mt-5 relative mb-1'>
          <label className={`${styles.label}`} htmlFor='password'>
            Enter Your Password
          </label>
          <input
            type={show ? 'text' : 'password'}
            name='password'
            value={values.password}
            onChange={handleChange}
            id='password'
            placeholder='Enter Your Password'
            className={`${errors.password && touched.password && 'border-red-500'} ${styles.input}`}
          />
          {show ? (
            <AiOutlineEye
              className='absolute bottom-3 right-3 z-1 cursor-pointer text-black dark:text-white'
              size={20}
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className='absolute bottom-3 right-3 z-1 cursor-pointer text-black dark:text-white'
              size={20}
              onClick={() => setShow(true)}
            />
          )}
        </div>
        {errors.password && touched.password && <span className='text-red-500 pt-2 block'>{errors.password}</span>}
        <div className='w-full mt-5'>
          <input type='submit' value='Login' className={`${styles.button} cursor-pointer !text-white`} />
        </div>
        <br />
        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>Or join with</h5>
        <div className='flex items-center justify-center my-3'>
          <AiFillGithub
            size={30}
            className='cursor-pointer mr-2 text-black dark:text-white'
            onClick={() => signIn('github')}
          />
          <FcGoogle size={30} className='cursor-pointer ml-2' onClick={() => signIn('google')} />
        </div>
        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
          Not have any account?{' '}
          <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute('Sign-Up')}>
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
