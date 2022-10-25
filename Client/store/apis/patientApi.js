import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../src/helpers/cookieFuncs';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/patient/',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatientInfo: builder.query({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    getPatientsCurrentTreatment: builder.query({
      query: (id) => ({
        url: `treatment/${id}`,
      }),
    }),
    getHistoryOfIllnessesParams: builder.query({
      query: () => ({
        url: 'historyOfIllnesses',
      }),
    }),
    getPatientsHistoryOfIllnesses: builder.query({
      query: ({ id, sort, sortdirection }) => ({
        url: `historyOfIllnesses/${id}?sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    aggregateHistoryOfIllnesses: builder.query({
      query: (id) => ({
        url: `historyOfIllnesses/${id}/aggregate`,
      }),
    }),
    update: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: `patient/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUpdateMutation,
  useLazyGetPatientInfoQuery,
  useLazyGetPatientsCurrentTreatmentQuery,
  useLazyGetPatientsHistoryOfIllnessesQuery,
  useLazyGetHistoryOfIllnessesParamsQuery,
  useLazyAggregateHistoryOfIllnessesQuery,
  useDeletePatientMutation,
} = patientApi;
