import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { useGetAllUsersQuery, useUpdateUserRoleMutation, useUserDeleteMutation } from '@/redux/features/user/userApi';
import { FC, useEffect, useState } from 'react';
import { styles } from '@/app/styles/style';
import { Modal } from '@mui/material';
import { toast } from 'react-toastify';

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();

  const [active, setActive] = useState<boolean>(false);

  const [role, setRole] = useState('');

  const [sendEmail, setSendEmail] = useState('');

  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState('');

  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation({});

  const { data, isLoading, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });

  const [userDelete, { isSuccess: deleteSuccess, error: deleteError }] = useUserDeleteMutation({});

  useEffect(() => {
    if (updateError) {
      if ('data' in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
        setActive(false);
      }
    }
    if (isSuccess) {
      setActive(false);
      refetch();
      toast.success('User role updated successfully');
      setActive(false);
      setRole('');
      setSendEmail('');
    }
    if (deleteSuccess) {
      setOpen(false);
      refetch();
      toast.success('User Deleted successfully');
      setOpen(false);
    }
    if (deleteError) {
      if ('data' in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.Message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const columns = [
    { field: 'id', headerName: 'Id', flex: 0.3 },
    { field: 'name', headerName: 'Name', flex: 0.5 },
    { field: 'email', headerName: 'Email', flex: 0.5 },
    { field: 'role', headerName: 'Role', flex: 0.5 },
    { field: 'courses', headerName: 'Purchased Coures', flex: 0.5 },
    { field: 'created_at', headerName: 'Joined At', flex: 0.5 },
    {
      field: '',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className={theme === 'dark' ? 'text-white' : 'text-black'} size={20} />
          </Button>
        );
      },
    },
    {
      field: ' ',
      headerName: 'Email',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className={theme === 'dark' ? 'text-white' : 'text-black'} size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];
  if (isTeam) {
    const newData = data && data.users?.filter((item: any) => item.role === 'admin');
    newData &&
      newData?.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users?.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  // const rows = [
  //   {
  //     id: '123',
  //     title: 'React JS',
  //     rating: '4.5',
  //     purchased: '30',
  //     created_at: '2022-05-12',
  //   },
  // ];

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const email = sendEmail;
    const body = { email, role };
    await updateUserRole(body);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const id = userId;
    await userDelete(id);
  };

  return (
    <div className='mt-[140px]'>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m='20px'>
          {isTeam && (
            <div>
              <div className='flex justify-end absolute top-16 right-[14px]'>
                <div
                  className={`${styles.button} !w-[220px] dark:bg-black dark:border dark:border-white text-white`}
                  onClick={() => {
                    setActive(active === true ? false : true);
                  }}
                >
                  Manage Members
                </div>
              </div>
            </div>
          )}
          {/* styles of box */}
          <Box
            m='40px 0 0 0'
            height='80vh'
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
                outline: 'none',
              },
              '& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-sortIcon': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-row': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderBottom: theme === 'dark' ? '1px solid #ffffff30!important' : '1px solid #ccc!important',
              },
              '& .MuiTablePagination-root': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
              },
              '& .name-column--cell': {
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                borderBottom: 'none',
                color: theme === 'dark' ? '#fff' : '#000',
              },
              '& .MuiDataGrid-virtualScroller': {
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#F2F0F0',
              },
              '& .MuiDataGrid-footerContainer': {
                color: theme === 'dark' ? '#fff' : '#000',
                borderTop: 'none',
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
              '& .MuiCheckbox-root': {
                color: theme === 'dark' ? '#b7ebde !important' : '#000 !important',
              },
              '& .MuiDataGrid-toolbarContainer .MuiDataGrid-text': {
                color: '#fff',
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {/* dialog box  for add roles*/}
          {active && (
            <>
              <Modal
                open={active}
                onClose={() => setActive(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <div className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 800px:w-[450px] w-[90vw] bg-white dark:bg-slate-900 rounded-[8px] p-4 px-8 shadow outline-none'>
                  <h1 className={`${styles.title}`}> Manage Members</h1>
                  <br />
                  <form onSubmit={handleUpdate}>
                    <label className={`${styles.label}`} htmlFor='email'>
                      Enter Your Email
                    </label>
                    <input
                      type='email'
                      name='sendEmail'
                      value={sendEmail}
                      onChange={(e) => {
                        setSendEmail(e.target.value);
                      }}
                      placeholder='example@gmail.com'
                      className={`${styles.input}`}
                    />
                    <div className='w-full mt-5 relative mb-1'>
                      <label className={`${styles.label}`} htmlFor='password'>
                        Select the role
                      </label>
                      <select
                        name='role'
                        className={`${styles.input}`}
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        required
                      >
                        <option
                          className='dark:bg-slate-900 dark:text-white text-black h-[30px]'
                          value=''
                          disabled={true}
                          selected={true}
                        >
                          <span className='text-slate-900'>Select role</span>
                        </option>
                        <option className='dark:bg-slate-900 dark:text-white text-black h-[30px]' value='admin'>
                          Admin
                        </option>
                        <option className='dark:bg-slate-900 dark:text-white text-black' value='User'>
                          User
                        </option>
                      </select>
                    </div>
                    <div className='w-full mt-5 flex justify-between gap-4'>
                      <input
                        type='button'
                        value='Cancel'
                        onClick={() => {
                          setActive(false);
                        }}
                        className={`${styles.button} cursor-pointer !text-white  items-center justify-center`}
                      />
                      <input
                        type='submit'
                        value='Make'
                        className={`${styles.button} cursor-pointer !text-white items-center justify-center !bg-green-600`}
                      />
                    </div>
                    <br />
                  </form>
                  <br />
                </div>
              </Modal>
            </>
          )}

          {/* dialog box for delete user */}
          {open && (
            <>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <div className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 800px:w-[450px] w-[90vw] bg-white dark:bg-slate-900 rounded-[8px] p-4 px-8 shadow outline-none'>
                  <h1 className={`${styles.title}`}>Delete User</h1>
                  <form onSubmit={handleDelete}>
                    <p className={`${styles.label} !text-center !text-lg mt-4`}>
                      Are you sure you want to delete this user!
                    </p>
                    <div className='w-full mt-4 flex items-center justify-center gap-4'>
                      <input
                        type='button'
                        value='Cancel'
                        className={`${styles.button} cursor-pointer !text-white items-center justify-center`}
                        onClick={() => {
                          setOpen(!open);
                        }}
                      />
                      <input
                        type='submit'
                        value='Delete User'
                        className={`${styles.button} cursor-pointer !text-white items-center justify-center !bg-red-600`}
                      />
                    </div>
                    <br />
                  </form>
                  <br />
                </div>
              </Modal>
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
