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
  login: '',
  password: '',
};

export const headDoctorSlice = createSlice({
  name: 'headDoctor',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setHeadDoctorInfo: (state, action) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.patronymic = action.payload.patronymic;
      state.address = action.payload.address;
      state.telephone = action.payload.telephone;
      state.birthDate = action.payload.birthdate;
      state.gender = action.payload.gender;
      state.passportNumber = action.payload.passportnumber;
      state.login = action.payload.login;
      state.password = action.payload.password;
    },
    clearHeadDoctorInfo: (state) => {
      state.name = initialState.name;
      state.surname = initialState.surname;
      state.patronymic = initialState.patronymic;
      state.address = initialState.address;
      state.telephone = initialState.telephone;
      state.birthDate = initialState.birthDate;
      state.gender = initialState.gender;
      state.passportNumber = initialState.passportNumber;
      state.login = initialState.login;
      state.password = initialState.password;
    },
  },
  /* eslint-disable no-param-reassign */
});

export const { setHeadDoctorInfo, clearHeadDoctorInfo } =
  headDoctorSlice.actions;

export default headDoctorSlice.reducer;
