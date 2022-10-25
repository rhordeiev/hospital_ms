import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  location: '',
};

export const hospitalSlice = createSlice({
  name: 'hospital',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    setHospitalInfo: (state, action) => {
      state.name = action.payload.name;
      state.location = action.payload.location;
    },
    clearHospitalInfo: (state) => {
      state.name = initialState.name;
      state.location = initialState.location;
    },
  },
  /* eslint-disable no-param-reassign */
});

export const { setHospitalInfo, clearHospitalInfo } = hospitalSlice.actions;

export default hospitalSlice.reducer;
