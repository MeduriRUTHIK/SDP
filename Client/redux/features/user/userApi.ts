import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //update the user avatar
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: 'update-user-avatar',
        method: 'PUT',
        body: { avatar },
        credentials: 'include' as const,
      }),
    }),

    //edit the name
    editProfile: builder.mutation({
      query: ({ name, email }) => ({
        url: 'update-user-info',
        method: 'PUT',
        body: { name, email },
        credentials: 'include' as const,
      }),
    }),

    // update password
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: 'update-user-password',
        method: 'PUT',
        body: { oldPassword, newPassword },
        credentials: 'include' as const,
      }),
    }),

    // get all users
    getAllUsers: builder.query({
      query: () => ({
        url: 'get-users',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    // update user role
    updateUserRole: builder.mutation({
      query: (body: any) => ({
        url: 'update-user',
        method: 'PUT',
        body,
        credentials: 'include' as const,
      }),
    }),

    // userDelete
    userDelete: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUserDeleteMutation,
} = userApi;
