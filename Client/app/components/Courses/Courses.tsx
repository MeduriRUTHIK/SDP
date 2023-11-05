import CourseBoxModel from '@/app/utils/CourseBoxModel'
import { useGetAllCoursesQuery, usePurchaseCourseMutation } from '@/redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material';
import { Box, Button } from '@mui/material';
import { styles } from '../../styles/style';
import { toast } from 'react-toastify';
type Props = {}
const Courses = (props: Props) => {
    const { data, isLoading, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [open, setOpen] = useState<boolean>(false);
    const [cardData, setCardData] = useState<any>();
    const [purchaseCourse, { isSuccess, isError, isLoading: purchaseIsLoading, error }] = usePurchaseCourseMutation();
    const handleurchase = (e: any) => {
        e.preventDefault();
        if(!purchaseIsLoading)
            purchaseCourse({ courseId: cardData?._id });
        if (isSuccess) {
            toast.success("course purchased successfully");
            setOpen(false);
        } if (error) {
            toast.error("Error in purchasing course")
        }
    }
    return (
        <section className='lg:py-16 min-h-screen max-h-full'>
            <div className='px-[8vw]'>
                <h1 className='text-4xl font-bold mb-8 dark:text-white text-black'>Courses</h1>
                <div className="grid lg:grid-cols-4 grid-cols-1 gap-12 p-4">
                    {data && data?.courses.map((course: any) => (
                        <CourseBoxModel 
                            course={course} 
                            open={open} setOpen={setOpen} 
                            cardData={cardData} setCardData={setCardData} 
                        />
                    ))}
                </div>
            </div>
            {
                open && (
                    <>
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
                                            <h1 className={`${styles.title}`}>Buy this Course</h1>
                                            <form onSubmit={() => { }}>
                                                <p className={`${styles.label} !text-center !text-lg mt-4`}>
                                                    {cardData.name}
                                                </p>
                                                <div className="flex gap-4 mt-2 px-16 justify-between items-center text-black dark:text-white">
                                                    <h1 className="text-2xl font-semibold">${cardData.price}</h1>
                                                    <div className="flex justify-end gap-3">
                                                        <h1 className="text-2xl font-normal line-through">
                                                            ${cardData.estimatedPrice}
                                                        </h1>
                                                        <h1 className="text-2xl font-normal">{cardData.ratings}%<sub>off</sub></h1>
                                                    </div>
                                                </div>
                                                <div className='w-full mt-5 flex items-center justify-center gap-4'>
                                                    <input
                                                        type='button'
                                                        value='Cancel'
                                                        className={`${styles.button} cursor-pointer !text-white items-center justify-center`}
                                                        onClick={() => setOpen(false)}
                                                    />
                                                    <input
                                                        type='submit'
                                                        value='proced payment'
                                                        className={`${styles.button} cursor-pointer !text-white items-center justify-center !bg-green-600`}
                                                        onClick={handleurchase}
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
                    </>
                )
            }
        </section>
    )
}

export default Courses