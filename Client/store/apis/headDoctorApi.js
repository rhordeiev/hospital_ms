import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../src/helpers/cookieFuncs';

export const headDoctorApi = createApi({
  reducerPath: 'headDoctorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/headdoctor/',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    getHospitalInfo: builder.query({
      query: () => ({
        url: 'hospital',
      }),
    }),
    getSpecialties: builder.query({
      query: () => ({
        url: 'specialties',
      }),
    }),
    getHeadsOfDepartmentsNames: builder.query({
      query: () => ({
        url: 'headsofdepartmentsNames',
      }),
    }),
    getHeadsOfDepartmentsInfo: builder.query({
      query: () => ({
        url: 'headsofdepartmentsInfo',
      }),
    }),
    getDepartments: builder.query({
      query: () => ({
        url: 'departments',
      }),
    }),
    changeViewDepartments: builder.query({
      query: ({ value, filter, sort, sortdirection }) => ({
        url: `departments/viewChange?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    changeViewHeadsOfDepartmentsInfo: builder.query({
      query: ({ value, filter, sort, sortdirection }) => ({
        url: `headsofdepartmentsInfo/viewChange?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    aggregateHeadsOfDepartmentsInfo: builder.query({
      query: ({ value, filter, sort, sortdirection }) => ({
        url: `headsofdepartmentsInfo/aggregate?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    aggregateDepartments: builder.query({
      query: ({ value, filter, sort, sortdirection }) => ({
        url: `departments/aggregate?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    update: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    updateHospital: builder.mutation({
      query: (body) => ({
        url: 'hospital',
        method: 'PATCH',
        body,
      }),
    }),
    updateHeadOfDepartment: builder.mutation({
      query: (body) => ({
        url: 'department',
        method: 'PATCH',
        body,
      }),
    }),
    addHeadOfDepartment: builder.mutation({
      query: (body) => ({
        url: 'headofdepartment',
        method: 'POST',
        body,
      }),
    }),
    addSpecialty: builder.mutation({
      query: (body) => ({
        url: 'specialty',
        method: 'POST',
        body,
      }),
    }),
    addDepartment: builder.mutation({
      query: (body) => ({
        url: 'department',
        method: 'POST',
        body,
      }),
    }),
    deleteHeadOfDepartment: builder.mutation({
      query: (id) => ({
        url: `headofdepartment/${id}`,
        method: 'DELETE',
      }),
    }),
    deleteDepartment: builder.mutation({
      query: (id) => ({
        url: `department/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUpdateMutation,
  useLazyGetInfoQuery,
  useUpdateHospitalMutation,
  useLazyGetHospitalInfoQuery,
  useAddHeadOfDepartmentMutation,
  useAddSpecialtyMutation,
  useAddDepartmentMutation,
  useLazyGetSpecialtiesQuery,
  useLazyGetHeadsOfDepartmentsNamesQuery,
  useUpdateHeadOfDepartmentMutation,
  useLazyGetHeadsOfDepartmentsInfoQuery,
  useLazyChangeViewHeadsOfDepartmentsInfoQuery,
  useDeleteHeadOfDepartmentMutation,
  useLazyAggregateHeadsOfDepartmentsInfoQuery,
  useLazyGetDepartmentsQuery,
  useLazyChangeViewDepartmentsQuery,
  useLazyAggregateDepartmentsQuery,
  useDeleteDepartmentMutation,
} = headDoctorApi;
