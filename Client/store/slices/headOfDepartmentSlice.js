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
  workingTime: '',
  workingDays: '',
  salary: '',
  login: '',
  password: '',
  departmentId: null,
};

export const headOfDepartmentSlice = createSlice({
  name: 'headOfDepartment',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setHeadOfDepartmentInfo: (state, action) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.patronymic = action.payload.patronymic;
      state.address = action.payload.address;
      state.telephone = action.payload.telephone;
      state.birthDate = action.payload.birthdate;
      state.gender = action.payload.gender;
      state.passportNumber = action.payload.passportnumber;
      state.workingTime = action.payload.workingtime;
      state.workingDays = action.payload.workingdays;
      state.salary = action.payload.salary;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.departmentId = action.payload.departmentId;
    },
    clearHeadOfDepartmentInfo: (state) => {
      state.name = initialState.name;
      state.surname = initialState.surname;
      state.patronymic = initialState.patronymic;
      state.address = initialState.address;
      state.telephone = initialState.telephone;
      state.birthDate = initialState.birthDate;
      state.gender = initialState.gender;
      state.passportNumber = initialState.passportNumber;
      state.workingTime = initialState.workingTime;
      state.workingDays = initialState.workingDays;
      state.salary = initialState.salary;
      state.login = initialState.login;
      state.password = initialState.password;
      state.departmentId = initialState.departmentId;
    },
  },
  /* eslint-disable no-param-reassign */
});

export const { setHeadOfDepartmentInfo, clearHeadOfDepartmentInfo } =
  headOfDepartmentSlice.actions;

export default headOfDepartmentSlice.reducer;
