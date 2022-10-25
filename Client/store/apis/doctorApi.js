import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '../../src/helpers/cookieFuncs';

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/doctor/',
    prepareHeaders: (headers) => {
      const token = getCookie('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDoctorInfo: builder.query({
      query: (id) => ({
        url: `${id}`,
      }),
    }),
    getDoctorsPatients: builder.query({
      query: (id) => ({
        url: `patients/${id}`,
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
    changeViewPatients: builder.query({
      query: ({ value, filter, sort, sortdirection, doctorId }) => ({
        url: `patients/${doctorId}/viewChange?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
      }),
    }),
    aggregatePatients: builder.query({
      query: ({ value, filter, sort, sortdirection, doctorId }) => ({
        url: `patients/${doctorId}/aggregate?value=${value}&filter=${filter}&sort=${sort}&sortdirection=${sortdirection}`,
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
    addPatient: builder.mutation({
      query: (body) => ({
        url: 'patient',
        method: 'POST',
        body,
      }),
    }),
    addTreatment: builder.mutation({
      query: (body) => ({
        url: 'treatment',
        method: 'POST',
        body,
      }),
    }),
    updatePatientTreatmentStatus: builder.mutation({
      query: ({ patientId, doctorId, body }) => ({
        url: `patient?patientId=${patientId}&doctorId=${doctorId}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useUpdateMutation,
  useLazyGetDoctorInfoQuery,
  useAddPatientMutation,
  useAddTreatmentMutation,
  useLazyGetDoctorsPatientsQuery,
  useUpdatePatientTreatmentStatusMutation,
  useLazyAggregatePatientsQuery,
  useLazyChangeViewPatientsQuery,
  useLazyGetPatientsHistoryOfIllnessesQuery,
  useLazyGetHistoryOfIllnessesParamsQuery,
  useLazyAggregateHistoryOfIllnessesQuery,
} = doctorApi;
