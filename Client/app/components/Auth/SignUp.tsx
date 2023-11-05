'use client';
import React, { FC, useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { styles } from '../../styles/style';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { toast } from 'react-toastify';

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required('Please Enter Your Name'),
  email: Yup.string().email('Invalid email').required('Please enter your email!'),
  password: Yup.string().required('Please enter your password').min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Registration Successful';
      toast.success(message);
      setRoute('Verification');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        console.log(errorData);
        toast.error(errorData?.data?.Message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      {
        /* verification */
      }
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className='w-full'>
      <h1 className={`${styles.title}`}>Join With LMS</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className={`${styles.label}`} htmlFor='name'>
            Enter Your name
          </label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            id='name'
            placeholder='John Deo'
            className={`${errors.name && touched.name && 'border-red-500'} ${styles.input}`}
          />
          {errors.name && touched.name && <span className='text-red-500 pt-2 block'>{errors.name}</span>}
        </div>
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
          <input type='submit' value='Sign Up' className={`${styles.button} cursor-pointer !text-white`} />
        </div>
        <br />
        <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>Or join with</h5>
        <div className='flex items-center justify-center my-3'>
          <AiFillGithub size={30} className='cursor-pointer mr-2 text-black dark:text-white' />
          <FcGoogle size={30} className='cursor-pointer ml-2' />
        </div>
        <h5 className='text-center pt-4 font-Poppins text-[14px] dark:text-white text-black'>
          Already have an account?{' '}
          <span className='text-[#2190ff] pl-1 cursor-pointer' onClick={() => setRoute('Login')}>
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Signup;
