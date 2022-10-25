import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  surname: '',
  patronymic: '',
  address: '',
  telephone: '',
  birthDate: '',
  gender: '',
  passportNumber: '',
  jobName: '',
  jobAddress: '',
  login: '',
  password: '',
};

export const patientSlice = createSlice({
  name: 'patient',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setPatientInfo: (state, action) => {
      state.departmentid = action.payload.departmentid;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.patronymic = action.payload.patronymic;
      state.address = action.payload.address;
      state.telephone = action.payload.telephone;
      state.birthDate = action.payload.birthdate;
      state.gender = action.payload.gender;
      state.passportNumber = action.payload.passportnumber;
      state.jobName = action.payload.jobname;
      state.jobAddress = action.payload.jobaddress;
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
    clearPatientInfo: (state) => {
      state.departmentid = initialState.departmentid;
      state.name = initialState.name;
      state.surname = initialState.surname;
      state.patronymic = initialState.patronymic;
      state.address = initialState.address;
      state.telephone = initialState.telephone;
      state.birthDate = initialState.birthDate;
      state.gender = initialState.gender;
      state.passportNumber = initialState.passportNumber;
      state.jobName = initialState.jobName;
      state.jobAddress = initialState.jobAddress;
      state.login = initialState.login;
      state.password = initialState.password;
    },
  },
  /* eslint-disable no-param-reassign */
});

export const { setPatientInfo, clearPatientInfo } = patientSlice.actions;

export default patientSlice.reducer;
