import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  departmentid: null,
  name: '',
  surname: '',
  patronymic: '',
  address: '',
  telephone: '',
  birthDate: '',
  specialization: null,
  gender: '',
  passportNumber: '',
  cabinet: '',
  workingTime: '',
  workingDays: '',
  salary: '',
  login: '',
  password: '',
};

export const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setDoctorInfo: (state, action) => {
      state.departmentid = action.payload.departmentid;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.patronymic = action.payload.patronymic;
      state.address = action.payload.address;
      state.telephone = action.payload.telephone;
      state.birthDate = action.payload.birthdate;
      state.specialization = action.payload.specialization;
      state.gender = action.payload.gender;
      state.passportNumber = action.payload.passportnumber;
      state.workingTime = action.payload.workingtime;
      state.workingDays = action.payload.workingdays;
      state.cabinet = action.payload.cabinet;
      state.salary = action.payload.salary;
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
    clearDoctorInfo: (state) => {
      state.departmentid = initialState.departmentid;
      state.name = initialState.name;
      state.surname = initialState.surname;
      state.patronymic = initialState.patronymic;
      state.address = initialState.address;
      state.telephone = initialState.telephone;
      state.birthDate = initialState.birthDate;
      state.specialization = initialState.specialization;
      state.gender = initialState.gender;
      state.passportNumber = initialState.passportNumber;
      state.workingTime = initialState.workingTime;
      state.workingDays = initialState.workingDays;
      state.cabinet = initialState.cabinet;
      state.salary = initialState.salary;
      state.login = initialState.login;
      state.password = initialState.password;
      state.departmentId = initialState.departmentId;
    },
  },
  /* eslint-disable no-param-reassign */
});

export const { setDoctorInfo, clearDoctorInfo } = doctorSlice.actions;

export default doctorSlice.reducer;
