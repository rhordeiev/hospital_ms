import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../src/helpers/cookieFuncs';

export const headOfDepartmentApi = createApi({
  reducerPath: 'headOfDepartmentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/headofdepartment/',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getHODInfo: builder.query({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    getDoctorsInfo: builder.query({
      query: () => ({
        url: 'doctors',
      }),
    }),
    getDepartmentInfo: builder.query({
      query: (id) => ({
        url: `department/${id}`,
      }),
    }),
    changeViewDoctorsInfo: builder.query({
      query: ({ value, filter, sort, sortdirection }) => ({
        url: `doctors/viewChange?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    aggregateDoctorsInfo: builder.query({
      query: ({ value, filter, sort, sortdirection }) => ({
        url: `doctors/aggregate?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    update: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    addDoctor: builder.mutation({
      query: (body) => ({
        url: 'doctor',
        method: 'POST',
        body,
      }),
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `doctor/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUpdateMutation,
  useLazyGetHODInfoQuery,
  useAddDoctorMutation,
  useLazyChangeViewDoctorsInfoQuery,
  useDeleteDoctorMutation,
  useLazyAggregateDoctorsInfoQuery,
  useLazyGetDoctorsInfoQuery,
  useLazyGetDepartmentInfoQuery,
} = headOfDepartmentApi;
