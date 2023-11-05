import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react';
import { AiOutlineDelete as AiOutlineDeleteIcon, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown as MdOutlineKeyboardArrowDownIcon } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import { toast } from 'react-toastify';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => any;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handlleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false));
  const [activeSection, setActiveSection] = useState<number>(1);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(courseContentData);
  };

  const handleCollapseToggle = (index: number) => {
    const updateCollasped = [...isCollapsed];
    updateCollasped[index] = !isCollapsed[index];
    setIsCollapsed(updateCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ text: '', url: '' });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.videoUrl === '' ||
      item.links[0].title === '' ||
      item.links[0].url === ''
    ) {
      toast.error('All fields must be filled');
    } else {
      let newVideoSection = '';

      if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: newVideoSection,
        links: [{ title: '', url: '' }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Please Fill all the fields');
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: '', url: '' }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].description === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].links[0].title === '' ||
      courseContentData[courseContentData.length - 1].links[0].url === ''
    ) {
      toast.error('Section cannot be empty');
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };

  console.log(courseContentData);

  return (
    <div className='w-[80%] m-auto mt-24 p-3'>
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput = index == 0 || item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? 'mt-10' : 'mb-0'}`}>
                {showSectionInput && (
                  <>
                    <div className='flex w-full items-center'>
                      <input
                        type='text'
                        className={`text-[20px] ${
                          item.videoSection === 'Untitled Section' ? 'w-[170px]' : 'w-min'
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiPencil className='cursor-pointer dark:text-white text-black' />
                    </div>
                    <br />
                  </>
                )}
                <div className='flex w-full items-center justify-between my-0 '>
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className='font-Poppins dark:text-white text-black'>
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  {/* // arrrow button for collasped video content */}
                  <div className='flex items-center'>
                    <AiOutlineDeleteIcon
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.slice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDownIcon
                      fontSize='large'
                      className='dark:text-white text-black'
                      style={{
                        transform: isCollapsed[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    {/* video title */}
                    <div className='my-3'>
                      <label htmlFor='' className={`${styles.label}`}>
                        video title
                      </label>
                      <input
                        type='text'
                        placeholder='Project Plan...'
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].title = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    {/* video url */}
                    <div className='my-3'>
                      <label htmlFor='' className={`${styles.label}`}>
                        video url
                      </label>
                      <input
                        type='text'
                        placeholder='mzdvvm'
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoUrl = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    {/* video description */}
                    <div className='my-3'>
                      <label htmlFor='' className={`${styles.label}`}>
                        video description
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder='mzdvvm'
                        className={`${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].description = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />

                      {item?.links.map((link: any, linkIndex: number) => (
                        <div className='mb-3 block'>
                          <div className='w-full flex items-center justify-between'>
                            <label className={styles.label}>Link {linkIndex + 1}</label>
                            <AiOutlineDeleteIcon
                              className={`${linkIndex === 0 ? 'cursor-no-drop' : 'cursor-default'} 
                                      text-black dark:text-white text-[20px]`}
                              onClick={() => (linkIndex === 0 ? null : handleRemoveLink(index, linkIndex))}
                            />
                          </div>
                          <input
                            type='text'
                            placeholder='Source code ...(links,title)'
                            className={`${styles.input}`}
                            value={link.title}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].title = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />

                          <input
                            type='url'
                            placeholder='Source code ...(links and urls)'
                            className={`${styles.input} mt-6`}
                            value={link.url}
                            onChange={(e) => {
                              const updatedData = [...courseContentData];
                              updatedData[index].links[linkIndex].url = e.target.value;
                              setCourseContentData(updatedData);
                            }}
                          />
                        </div>
                      ))}
                      <br />

                      {/* add link button*/}
                      <div className='inline-block mb-4'>
                        <p
                          className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                          onClick={() => {
                            handleAddLink(index);
                          }}
                        >
                          <BsLink45Deg className='mr-2' />
                          Add Link
                        </p>
                      </div>
                    </div>
                  </>
                )}
                <br />

                {/* add new content */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className='mr-2' />
                      Add new Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />

        <div
          className='flex items-center text-[20px] dark:text-white text-black cursor-pointer'
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className='mr-2' />
          Add new Section
        </div>
      </form>
      <br />
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
      <br />
      <br />
      <br />
    </div>
  );
};
export default CourseContent;
