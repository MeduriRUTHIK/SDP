import { apiSlice } from '../api/apiSlice';

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // create course
    createCourse: builder.mutation({
      query: (data) => ({
        url: 'create-course',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),

    // get all courses --admin
    getAllCourses: builder.query({
      query: () => ({
        url: 'get-courses',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    // delete course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
    
    //edit 
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include' as const,
      }),
    }),
    
    // purchase course
    purchaseCourse:builder.mutation({
      query:(courseId)=>({
        url: 'create-order',
        method: 'POST',
        body: courseId,
        credentials: 'include' as const,
      }),
    }),

  }),
});

export const { useCreateCourseMutation, 
                useGetAllCoursesQuery, 
                useDeleteCourseMutation, 
                useEditCourseMutation,
                usePurchaseCourseMutation
              } = courseApi;
