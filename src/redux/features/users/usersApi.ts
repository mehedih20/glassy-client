import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (email) => {
        const params = new URLSearchParams();
        params.append("email", email);

        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
    }),
    changeUserRole: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/change-user-role/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
    }),
  }),
});

export const { useGetAllUsersQuery, useChangeUserRoleMutation } = authApi;
