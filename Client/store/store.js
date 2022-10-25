import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/userSlice';
import headDoctorReducer from './slices/headDoctorSlice';
import hospitalReducer from './slices/hospitalSlice';
import headOfDepartmentReducer from './slices/headOfDepartmentSlice';
import doctorReducer from './slices/doctorSlice';
import patientReducer from './slices/patientSlice';
import { userApi } from './apis/userApi';
import { headDoctorApi } from './apis/headDoctorApi';
import { headOfDepartmentApi } from './apis/headOfDepartmentApi';
import { doctorApi } from './apis/doctorApi';
import { patientApi } from './apis/patientApi';

const rootReducer = combineReducers({
  user: userReducer,
  headDoctor: headDoctorReducer,
  hospital: hospitalReducer,
  headOfDepartment: headOfDepartmentReducer,
  doctor: doctorReducer,
  patient: patientReducer,
  [userApi.reducerPath]: userApi.reducer,
  [headDoctorApi.reducerPath]: headDoctorApi.reducer,
  [headOfDepartmentApi.reducerPath]: headOfDepartmentApi.reducer,
  [doctorApi.reducerPath]: doctorApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    userApi.reducerPath,
    headDoctorApi.reducerPath,
    headOfDepartmentApi.reducerPath,
    doctorApi.reducerPath,
    patientApi.reducerPath,
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      userApi.middleware,
      headDoctorApi.middleware,
      headOfDepartmentApi.middleware,
      doctorApi.middleware,
      patientApi.middleware,
    ),
});
export const persistor = persistStore(store);

setupListeners(store.dispatch);
