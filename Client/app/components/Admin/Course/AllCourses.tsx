import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import { FiEdit } from 'react-icons/fi';
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { styles } from '@/app/styles/style';
import { toast } from 'react-toastify';
import Link from 'next/link';

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const { data, isLoading, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  console.log(data);
  const [courseId, setCourseId] = useState('');

  const columns = [
    { field: 'id', headerName: 'Id', flex: 0.5 },
    { field: 'title', headerName: 'Course Title', flex: 1 },
    { field: 'rating', headerName: 'Rating', flex: 0.5 },
    { field: 'purchased', headerName: 'Purchased', flex: 0.5 },
    { field: 'created_at', headerName: 'Created At', flex: 0.5 },
    {
      field: ' ',
      headerName: 'Edit',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <FiEdit className={theme === 'dark' ? 'text-white' : 'text-black'} size={20} />
          </Link>
        );
      },
    },
    {
      field: '',
      headerName: 'Delete',
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setCourseId(params.row.id);
            }}
          >
            <AiOutlineDelete className={theme === 'dark' ? 'text-white' : 'text-black'} size={20} />
          </Button>
        );
      },
    },
  ];

  const rows: any = [];

  {
    data &&
      data.courses?.forEach((item: any) => {
        // console.log(item);
        rows.push({
          id: item._id,
          title: item.name,
          rating: item.ratings,
          purchased: item.purchased,
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

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success('Course Deleted Successfully');
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = deleteCourse as any;
        toast.error(errorMessage.data?.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const id = courseId;
    await deleteCourse(id);
    setOpen(false);
  };

  return (
    <div className='mt-[120px]'>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m='20px'>
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
          {open && (
            <>
              <Box>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <div className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 800px:w-[450px] w-[90vw] bg-white dark:bg-slate-900 rounded-[8px] p-4 px-8 shadow outline-none'>
                    <h1 className={`${styles.title}`}>Delete Course</h1>
                    <form onSubmit={handleDelete}>
                      <p className={`${styles.label} !text-center !text-lg mt-4`}>
                        Are you sure you want to delete this course!
                      </p>
                      <div className='w-full mt-5 flex items-center justify-center gap-4'>
                        <input
                          type='button'
                          value='Cancel'
                          className={`${styles.button} cursor-pointer !text-white items-center justify-center`}
                          onClick={() => setOpen(false)}
                        />
                        <input
                          type='submit'
                          value='Delete Course'
                          className={`${styles.button} cursor-pointer !text-white items-center justify-center !bg-red-600`}
                        />
                      </div>
                      <br />
                    </form>
                    <br />
                  </div>
                </Modal>
              </Box>
            </>
          )}
        </Box>
      )}
    </div>
  );
};
export default AllCourses;
