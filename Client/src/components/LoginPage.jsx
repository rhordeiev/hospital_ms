import React, { useRef } from 'react';
import '../../public/css/loginPage.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../store/slices/userSlice';
import { useLoginUserMutation } from '../../store/apis/userApi';
import {
  useLazyGetHospitalInfoQuery,
  useLazyGetInfoQuery,
} from '../../store/apis/headDoctorApi';
import { useLazyGetHODInfoQuery } from '../../store/apis/headOfDepartmentApi';
import { setHeadDoctorInfo } from '../../store/slices/headDoctorSlice';
import { setHeadOfDepartmentInfo } from '../../store/slices/headOfDepartmentSlice';
import { setHospitalInfo } from '../../store/slices/hospitalSlice';
import { setDoctorInfo } from '../../store/slices/doctorSlice';
import { setPatientInfo } from '../../store/slices/patientSlice';
import { useLazyGetDoctorInfoQuery } from '../../store/apis/doctorApi';
import { useLazyGetPatientInfoQuery } from '../../store/apis/patientApi';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const errorLoginRef = useRef();
  const errorPasswordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const [getHeadDoctorInfo] = useLazyGetInfoQuery();
  const [getHODInfo] = useLazyGetHODInfoQuery();
  const [getHospitalInfo] = useLazyGetHospitalInfoQuery();
  const [getDoctorInfo] = useLazyGetDoctorInfoQuery();
  const [getPatientInfo] = useLazyGetPatientInfoQuery();
  const onSubmit = async (enteredData) => {
    try {
      const userLoginData = await loginUser(enteredData);
      document.cookie = `token=${userLoginData.data.token}; max-age=${
        userLoginData.data.expirationTime / 1000
      }`;
      let userPersonalData;
      dispatch(setUserInfo(userLoginData.data));
      let pathForRole;
      if (userLoginData.data.user.rolename === 'Головний лікар') {
        pathForRole = 'headdoctor';
        userPersonalData = await getHeadDoctorInfo(userLoginData.data.user.id);
        dispatch(setHeadDoctorInfo(userPersonalData.data));
        const hospitalData = await getHospitalInfo();
        dispatch(setHospitalInfo(hospitalData.data));
      } else if (userLoginData.data.user.rolename === 'Завідувач відділенням') {
        pathForRole = 'headofdepartment';
        userPersonalData = await getHODInfo(userLoginData.data.user.id);
        dispatch(setHeadOfDepartmentInfo(userPersonalData.data));
      } else if (userLoginData.data.user.rolename === 'Лікар') {
        pathForRole = 'doctor';
        userPersonalData = await getDoctorInfo(userLoginData.data.user.id);
        dispatch(setDoctorInfo(userPersonalData.data));
      } else if (userLoginData.data.user.rolename === 'Пацієнт') {
        pathForRole = 'patient';
        userPersonalData = await getPatientInfo(userLoginData.data.user.id);
        dispatch(setPatientInfo(userPersonalData.data));
      } else {
        return navigate(0);
      }
      return navigate(`/${pathForRole}/me`);
    } catch (err) {
      errorLoginRef.current.textContent = 'Користувача не знайдено.';
      errorPasswordRef.current.textContent = 'Перевірте введені дані.';
      return null;
    }
  };

  return (
    <div className="flexBlock loginBlock">
      {/* <h1 className="hospitalName">Поліклініка №1</h1> */}
      <div className="formBlock">
        <form
          action="/sign/loginUser"
          className="flexBlock"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="enterDataText">
            <b>Введіть свої дані</b>
          </div>
          <input
            type="text"
            placeholder="Логін"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('login', {
              required: 'Поле повинно бути заповнено',
            })}
          />
          <span className="errorField" ref={errorLoginRef}>
            &nbsp;
            {errors.login?.message}
          </span>
          <input
            type="password"
            placeholder="Пароль"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', {
              required: 'Поле повинно бути заповнено',
              minLength: {
                value: 7,
                message: 'Довжина пароля повинна бути не менше 7 символів!',
              },
            })}
          />
          <span className="errorField" ref={errorPasswordRef}>
            &nbsp;
            {errors.password?.message}
          </span>
          <button type="submit">Ввійти</button>
        </form>
      </div>
    </div>
  );
}
