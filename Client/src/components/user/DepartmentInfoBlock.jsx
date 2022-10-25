/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../../../public/css/user/userInfoBlock.scss';
import '../../../public/css/user/tableInfoBlock.scss';
import { useLazyGetDepartmentInfoQuery } from '../../../store/apis/headOfDepartmentApi';

export default function DepartmentInfoBlock() {
  const departmentId = useSelector(
    (state) => state.headOfDepartment.departmentId,
  );
  const [getDepartmentInfo] = useLazyGetDepartmentInfoQuery();
  const [departmentInfo, setDepartmentInfo] = useState({});

  const fetchDepartmentInfo = async () => {
    const result = await getDepartmentInfo(departmentId);
    return result;
  };

  useEffect(() => {
    fetchDepartmentInfo().then((result) => {
      setDepartmentInfo(result.data);
    });
  }, []);

  return (
    <div className="userInfoBlock tableInfoBlock">
      <table>
        <tbody>
          <tr>
            <th>Спеціальність:</th>
            <td>{departmentInfo.specialtyName}</td>
          </tr>
          <tr>
            <th>Кількість лікарів:</th>
            <td>{departmentInfo.doctorCount}</td>
          </tr>
          <tr>
            <th>Кількість пацієнтів:</th>
            <td>{departmentInfo.patientCount}</td>
          </tr>
          <tr>
            <th>Кількість вилікованих:</th>
            <td>{departmentInfo.curedCount}</td>
          </tr>
          <tr>
            <th>Середній вік лікарів:</th>
            <td>{departmentInfo.avgDoctorAge}</td>
          </tr>
          <tr>
            <th>Найменший вік лікарів:</th>
            <td>{departmentInfo.minDoctorAge}</td>
          </tr>
          <tr>
            <th>Найбільший вік лікарів:</th>
            <td>{departmentInfo.maxDoctorAge}</td>
          </tr>
          <tr>
            <th>Середній вік пацієнтів:</th>
            <td>{departmentInfo.avgPatientAge}</td>
          </tr>
          <tr>
            <th>Найменший вік пацієнтів:</th>
            <td>{departmentInfo.minPatientAge}</td>
          </tr>
          <tr>
            <th>Найбільший вік пацієнтів:</th>
            <td>{departmentInfo.maxPatientAge}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
