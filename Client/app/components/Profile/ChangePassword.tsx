import { styles } from '@/app/styles/style';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {};

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const clearFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();
  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
    clearFields();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success('Password Change Successfully');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.Message);
        clearFields();
      }
    }
    clearFields();
  }, [isSuccess, error]);

  return (
    <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
      <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] dark:text-[#fff] text-[black] pb-2'>
        Change password
      </h1>
      <div className='w-full'>
        <form aria-required onSubmit={passwordChangeHandler} className='flex flex-col items-center'>
          <div className='w-[100%] 800px:w-[60%] mt-5'>
            <label className='block pb-2 dark:text-[#fff] text-[black]'>Enter your old password</label>
            <input
              type='password'
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className='w-[100%] 800px:w-[60%] mt-5'>
            <label className='block pb-2 dark:text-[#fff] text-[black]'>Enter your New password</label>
            <input
              type='password'
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className='w-[100%] 800px:w-[60%] mt-5'>
            <label className='block pb-2 dark:text-[#fff] text-[black]'>Confirm New password</label>
            <input
              type='password'
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
          <div className='w-[100%] 800px:w-[60%] mt-5'>
            <input
              type='submit'
              className={`w-full 800px:w-[250px] h-[40px] border dark:border-sky-500 border-[crimson] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value='Update'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
