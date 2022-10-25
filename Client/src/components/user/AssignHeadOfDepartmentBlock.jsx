/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useForm } from 'react-hook-form';
import {
  useLazyGetSpecialtiesQuery,
  useLazyGetHeadsOfDepartmentsNamesQuery,
  useUpdateHeadOfDepartmentMutation,
} from '../../../store/apis/headDoctorApi';

export default function AssignHeadOfDepartmentBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [getSpecialties] = useLazyGetSpecialtiesQuery();
  const [getHeadsOfDepartments] = useLazyGetHeadsOfDepartmentsNamesQuery();
  const [setHeadOfDepartment] = useUpdateHeadOfDepartmentMutation();
  const [specialties, setSpecialties] = useState([]);
  const [headsOfDepartments, setHeadsOfDepartments] = useState([]);
  const specialtiesRef = useRef();
  const headsOfDepartmentsRef = useRef();

  const onSubmit = async () => {
    // console.log(specialtiesRef.current.value);
    // console.log(headsOfDepartmentsRef.current.value);
    await setHeadOfDepartment({
      specialtyid: specialtiesRef.current.value,
      headofdepartmentid: headsOfDepartmentsRef.current.value,
    });
  };

  async function fetchSpecialties() {
    const fetchedResult = (await getSpecialties()).data;
    const renderedResult = fetchedResult.map((current) => (
      <option key={current.id} value={current.id}>
        {current.name}
      </option>
    ));
    return renderedResult;
  }
  async function fetchHeadsOfDepartments() {
    const fetchedResult = (await getHeadsOfDepartments()).data;
    const renderedResult = fetchedResult.map((current) => (
      <option key={current.id} value={current.id}>
        {`${current.surname} ${current.name} ${current.patronymic}`}
      </option>
    ));
    return renderedResult;
  }

  useEffect(() => {
    fetchSpecialties().then((result) => {
      setSpecialties(result);
    });
    fetchHeadsOfDepartments().then((result) => {
      setHeadsOfDepartments(result);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="userInfoBlock">
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="specialtyid">Відділення:</label>
            </td>
            <td>
              <select
                id="specialtyid"
                {...register('specialtyid')}
                ref={specialtiesRef}
              >
                {specialties}
              </select>
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>
              <span className="errorField">
                &nbsp;
                {errors.specialtyid?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="headofdepartmentid">Завідувач відділенням:</label>
            </td>
            <td>
              <select
                id="headofdepartmentid"
                {...register('headofdepartmentid')}
                ref={headsOfDepartmentsRef}
              >
                {headsOfDepartments}
              </select>
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>
              <span className="errorField">
                &nbsp;
                {errors.specialtyid?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button type="submit">Зберегти</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
