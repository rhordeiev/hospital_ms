/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useUpdateHospitalMutation } from '../../../store/apis/headDoctorApi';
import { setHospitalInfo } from '../../../store/slices/hospitalSlice';

export default function HeadDoctorInfoBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const name = useSelector((state) => state.hospital.name);
  const location = useSelector((state) => state.hospital.location);
  const [updateHospital] = useUpdateHospitalMutation();
  const dispatch = useDispatch();

  const onSubmit = async (enteredData) => {
    await updateHospital(enteredData);
    dispatch(setHospitalInfo(enteredData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="userInfoBlock">
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="name">Назва:</label>
            </td>
            <td>
              <input
                type="text"
                id="name"
                placeholder="Назва"
                defaultValue={name}
                {...register('name', {
                  required: 'Поле повинно бути заповнено',
                })}
              />
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>
              <span className="errorField">
                &nbsp;
                {errors.name?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="location">Місце знаходження:</label>
            </td>
            <td>
              <input
                type="text"
                id="location"
                placeholder="Місце знаходження"
                defaultValue={location}
                {...register('location', {
                  required: 'Поле повинно бути заповнено',
                })}
              />
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>
              <span className="errorField">
                &nbsp;
                {errors.surname?.message}
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
