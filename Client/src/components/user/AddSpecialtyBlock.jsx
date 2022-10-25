/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useForm } from 'react-hook-form';
import { useAddSpecialtyMutation } from '../../../store/apis/headDoctorApi';

export default function AddSpecialtyBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addSpecialty] = useAddSpecialtyMutation();

  const onSubmit = async (enteredData) => {
    await addSpecialty(enteredData);
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
            <td colSpan={2}>
              <button type="submit">Додати</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
