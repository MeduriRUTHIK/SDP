import React, { FC, useState, useEffect } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import Image from 'next/image';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { styles } from '@/app/styles/style';
import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { toast } from 'react-toastify';

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [loadUser, setLoadUser] = useState<boolean>(false);

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();

  const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();

  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      if (error) {
        console.log(error);
      }
      if (updateError) {
        console.log(updateError);
      }
    }
    if (success) {
      toast.success('Profile updated successfully');
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== '' && name !== null) {
      await editProfile({ name, email: user.email });
    }
  };

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='relative'>
          {user?.avatar || avatar ? (
            <Image
              src={user.avatar.url}
              alt='user-icon'
              loading='lazy'
              width={40}
              height={40}
              className='w-[120px] h-[120px] cursor-pointer border-[3px] dark:border-sky-500 border-[crimson] rounded-full'
            />
          ) : (
            <HiOutlineUserCircle className='cursor-pointer dark:text-blue-500 text-[crimson] font-[400] lg:w-[120px] lg:h-[120px] rounded-full boder-[2px] w-[80px] h-[80px]' />
          )}

          <input
            type='file'
            name=''
            id='avatar'
            className='hidden'
            onChange={imageHandler}
            accept='image/png.image/jpg,image/jpeg,image/webp'
          />
          <label htmlFor='avatar'>
            <div className='w-[30px] h-[30px] dark:bg-slate-900 bg-white rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer border-[2px] dark:border-blue-50 border-slate-600'>
              <AiOutlineCamera size={20} className='dark:text-white text-black' />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className='w-full pl-6 800px:pl-10'>
        <form onSubmit={handleSubmit}>
          <div className='800px:w-[50%] m-auto block pb-4'>
            <div className='w-[100%]'>
              <label className='block pb-2 text-black dark:text-white'>Full Name</label>
              <input
                type='text'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-[100%] pt-[12px] lg:mt-2'>
              <label className='block pb-2 dark:text-white text-black'>Email Address</label>
              <input
                type='email'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                readOnly
                value={user?.email}
                disabled
              />
            </div>
            <div className='w-[100%] pt-2'>
              <input
                type='submit'
                className={`w-full 800px:w-[250px] h-[40px] border dark:border-sky-500 border-[crimson] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer`}
                required
                value={'update'}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
