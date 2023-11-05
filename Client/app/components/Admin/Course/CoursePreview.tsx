import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import React, { FC } from 'react';
import Ratings from '../../../utils/Ratings';
import { IoIosCheckmarkCircleOutline, IoMdCheckmarkCircleOutline } from 'react-icons/io';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({ courseData, active, setActive, handleCourseCreate, isEdit }) => {
  const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className='w-[90%] m-auto py-5 mb-5'>
      <div className='w-full relative'>
        <div className='w-full mt-10'>
          <CoursePlayer title={courseData.title} videoUrl={courseData.videoUrl} />
        </div>
        <div className='flex items-center dark:text-white text-black'>
          <h1 className='pt-5 text-[25px]'>{courseData?.price === 0 ? 'Free' : courseData?.price + '$'}</h1>
          <h5 className='pl-3 text-[22.3px] mt-[20px] line-through opacity-60'>{courseData?.estimatedPrice}$</h5>
          <h4 className='pl-5 pt-4 text-[22px]'>{discountPercentagePrice}% off</h4>
        </div>
        <div className='flex items-center'>
          <div className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-pointer !text-white`}>
            Buy Now {courseData?.price}
          </div>
        </div>
        <div className='flex items-center'>
          <input
            type='text'
            name=''
            id=''
            placeholder='Discount code ...'
            className={`${styles.input} 1500px:w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
          />
          <div className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer !text-white`}>Apply</div>
        </div>
        <ul className='list-disc ml-[14px]'>
          <li className='pb-1 text-black dark:text-white'>source code including</li>
          <li className='pb-1 text-black dark:text-white'>Full lifetime access</li>
          <li className='pb-1 text-black dark:text-white'>Certificate of completion</li>
          <li className='pb-1 800px:pb-1 text-black dark:text-white'>Premium Support</li>
        </ul>
      </div>
      <div className='w-full'>
        <div className='w-full 800px:pr-5'>
          <h1 className='text-[25px] font-Poppins mt-[10px] font-[600] text-black dark:text-white'>
            {courseData.name}
          </h1>
          <div className='flex items-center justify-between pt-3'>
            <div className='flex items-center'>
              <Ratings rating={0} />
              <h5 className='text-black dark:text-white'>0 Reviews</h5>
            </div>
            <h5 className='text-black dark:text-white'>0 Students</h5>
          </div>
          <br />
          <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
            What will you learn from this courese?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className='w-full flex 800px:items-center py-2 mt-1' key={index}>
            <div className='w-[15px] mr-1 text-black dark:text-white'>
              <IoIosCheckmarkCircleOutline size={20} />
            </div>
            <p className='pl-2 text-black dark:text-white'>{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
          What are the prequisites for takeing this course ?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className='w-full flex 800px:items-center py-2 mt-1' key={index}>
            <div className='w-[15px] mr-1 text-black dark:text-white'>
              <IoIosCheckmarkCircleOutline size={20} />
            </div>
            <p className='pl-2 text-black dark:text-white'>{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className='w-full text-[25px] font-Poppins font-[600]'>
          <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>Course Details</h1>
          <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white font-[450]'>
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className='w-full flex items-center justify-between'>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#3b82f6] text-center text-[#fff] rounded mt-8 cursor-pointer'
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#3b82f6] text-center text-[#fff] rounded mt-8 cursor-pointer'
          onClick={() => createCourse()}
        >
          {isEdit ? 'Update' : 'create'}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CoursePreview;
