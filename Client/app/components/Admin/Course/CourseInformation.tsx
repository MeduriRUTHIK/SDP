import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react';

type Props = {
  courseInfo: any;
  setCourseInfo: (course: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const [dragging, setDrapping] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDrapping(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDrapping(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDrapping(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='w-[80%] m-auto mt-24'>
      <form onSubmit={handleSubmit}>
        <div className=''>
          <label htmlFor='' className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type='text'
            name=''
            required
            value={courseInfo.name}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, name: e.target.value })}
            id='name'
            placeholder='MERN satck LMS platform with next 13.7'
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className='mb-5'>
          <label htmlFor='' className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name=''
            id='description'
            cols={30}
            rows={8}
            value={courseInfo.description}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })}
            placeholder='Write something'
            className={`${styles.input} !h-min !py-2`}
          />
        </div>
        <br />
        <div className='w-full gap-x-5 flex justify-between'>
          <div className='w-[50%]'>
            <label htmlFor='' className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type='number'
              required
              value={courseInfo.price}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, price: e.target.value })}
              name=''
              id='price'
              placeholder='$32'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label htmlFor='' className={`${styles.label}`}>
              Estimated Price(optional)
            </label>
            <input
              type='number'
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
              name=''
              id='estimatedPrice'
              placeholder='$44'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className=''>
          <label htmlFor='' className={`${styles.label}`}>
            Course Tags
          </label>
          <input
            type='text'
            required
            value={courseInfo.tags}
            onChange={(e: any) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
            name=''
            id='tags'
            placeholder='Next13, MERN, ROR, Socket.io '
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className='w-full gap-x-5 flex justify-between'>
          <div className='w-[50%]'>
            <label htmlFor='' className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type='text'
              required
              value={courseInfo.level}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, level: e.target.value })}
              name=''
              id='level'
              placeholder='Beginers/Intermediats/Exper'
              className={`${styles.input}`}
            />
          </div>
          <div className='w-[50%]'>
            <label htmlFor='' className={`${styles.label}`}>
              Demo url
            </label>
            <input
              type='text'
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
              name=''
              id='demoUrl'
              placeholder='https://course.demo'
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <br />
        <div className='w-full'>
          <input type='file' id='file' accept='image/*' className='hidden' onChange={handleFileChange} />
          <label
            htmlFor='file'
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img src={courseInfo.thumbnail} alt='' className='max-h-full w-full object-cover' />
            ) : (
              <span className={`${styles.label}`}>Drog and drop your thumbnail or click here to brouse</span>
            )}
          </label>
        </div>
        <br />
        <div className='w-full flex items-center justify-end'>
          <input
            type='submit'
            value='next'
            className='w-full 800px:w-[180px] h-[40px] bg-[#3b82f6] text-center text-[18px] text-white rounded mt-8 cursor-pointer'
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
