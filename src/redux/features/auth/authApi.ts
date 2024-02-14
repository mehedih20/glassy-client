import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    register: builder.mutation({
      query: (registrationData) => ({
        url: "/auth/register",
        method: "POST",
        body: registrationData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
