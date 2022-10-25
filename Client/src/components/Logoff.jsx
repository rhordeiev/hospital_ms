import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { deleteCookie } from '../helpers/cookieFuncs';
import { clearUserInfo } from '../../store/slices/userSlice';
import { clearHeadDoctorInfo } from '../../store/slices/headDoctorSlice';
import { clearHeadOfDepartmentInfo } from '../../store/slices/headOfDepartmentSlice';
import { clearHospitalInfo } from '../../store/slices/hospitalSlice';
import { clearDoctorInfo } from '../../store/slices/doctorSlice';
import { clearPatientInfo } from '../../store/slices/patientSlice';

export default function Logoff() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
  useEffect(() => {
    if (role === 'Головний лікар') {
      dispatch(clearHeadDoctorInfo());
      dispatch(clearHospitalInfo());
    } else if (role === 'Завідувач відділенням') {
      dispatch(clearHeadOfDepartmentInfo());
    } else if (role === 'Лікар') {
      dispatch(clearDoctorInfo());
    } else if (role === 'Пацієнт') {
      dispatch(clearPatientInfo());
    }
    deleteCookie('token');
    dispatch(clearUserInfo());
  }, []);

  return <Navigate to="/login" replace />;
}
