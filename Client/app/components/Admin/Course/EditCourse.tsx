'use client';
import React, { useState, useEffect, FC } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';

import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import {
  useCreateCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from '../../../../redux/features/courses/coursesApi';

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [active, setActive] = useState<number>(0);
  // const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const { data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Course updated successfully');
      redirect('/admin/courses');
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.Message);

        console.log(error);
      }
    }
  }, [isSuccess, error]);

  const editCourseData = data && data?.courses.find((course: any) => course._id === id);
  // console.log(editCourseData);

  useEffect(() => {
    if (editCourseData) {
      console.log(editCourseData);
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail?.url,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  });

  const [benefits, setBenefits] = useState([{ title: '' }]);

  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);

  // lod fucker
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      links: [
        {
          title: '',
          url: '',
        },
      ],
      suggestions: '',
    },
  ]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    const formattedBenifits = benefits.map((benefit: any) => ({ title: benefit.title }));
    const formattedPrerequisites = prerequisites.map((prerequisite: any) => ({ title: prerequisite.title }));
    const formattedCourseContentData = courseContentData.map((courseContent) => ({
      videourl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestions: courseContent.suggestions,
    }));

    // prepare data obj
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenifits,
      prerequisites: formattedPrerequisites,
      courseContents: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () => {
    const data = courseData;
    await editCourse({ id: editCourseData?._id, data });
  };

  return (
    <div className='w-full flex min-h-screen'>
      <div className='w-[80%]'>
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenifits={setBenefits}
            prerequisites={prerequisites}
            setPrequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
