import { styles } from '@/app/styles/style';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { FC } from 'react';
import { toast } from 'react-toastify';

type Props = {
  benefits: { title: string }[];
  setBenifits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({ benefits, setBenifits, prerequisites, setPrequisites, active, setActive }) => {
  const handleBeniefitChange = (index: number, value: any) => {
    const updatedBenifits = [...benefits];
    updatedBenifits[index].title = value;
    setBenifits(updatedBenifits);
  };
  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrequisites = [...prerequisites];
    updatedPrequisites[index].title = value;
    setPrequisites(updatedPrequisites);
  };

  const handleAddBenifit = () => {
    setBenifits([...benefits, { title: '' }]);
  };

  const handleAddPrerequisites = () => {
    setPrequisites([...prerequisites, { title: '' }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (benefits[benefits.length - 1]?.title !== '' && prerequisites[prerequisites.length - 1]?.title !== '') {
      setActive(active + 1);
    } else {
      toast.error('Please fill all fields to continue');
    }
  };

  return (
    <div className='w-[80%] m-auto mt-24 block'>
      {/* Benifits section */}
      <div className=''>
        <label htmlFor='text' className={`${styles.label} text-[20px] `}>
          What are the benefits for the learners of this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            key={index}
            type='text'
            name='benifits'
            id=''
            placeholder='You will able to build full stack Applications...'
            required
            className={`${styles.input} my-[10px]`}
            value={benefit.title}
            onChange={(e) => handleBeniefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddBenifit}
          className='dark:text-white text-black'
        />
      </div>
      <br />
      {/* prerequisites */}
      <div className=''>
        <label htmlFor='textl' className={`${styles.label} text-[20px] `}>
          What are the prerequisites for the learners ot take this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            key={index}
            type='text'
            name='prerequisites'
            id=''
            placeholder='You have to avair of basic html, css and problem solving skills.'
            required
            className={`${styles.input} my-[10px]`}
            value={prerequisite.title}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: '10px 0px', cursor: 'pointer', width: '30px' }}
          onClick={handleAddPrerequisites}
          className='dark:text-white text-black'
        />
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
          onClick={() => handleOptions()}
        >
          next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
