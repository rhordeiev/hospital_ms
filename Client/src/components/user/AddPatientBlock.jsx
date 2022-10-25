/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAddPatientMutation } from '../../../store/apis/doctorApi';

export default function AddPatientBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addPatient] = useAddPatientMutation();
  const doctorId = useSelector((state) => state.user.id);

  const onSubmit = async (enteredData) => {
    await addPatient({ ...enteredData, doctorId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="userInfoBlock">
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="name">Ім&apos;я:</label>
            </td>
            <td>
              <input
                type="text"
                id="name"
                placeholder="Ім'я"
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
              <label htmlFor="surname">Прізвище:</label>
            </td>
            <td>
              <input
                type="text"
                id="surname"
                placeholder="Прізвище"
                {...register('surname', {
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
            <td>
              <label htmlFor="patronymic">По батькові:</label>
            </td>
            <td>
              <input
                type="text"
                id="patronymic"
                placeholder="По батькові"
                {...register('patronymic', {
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
                {errors.patronymic?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="address">Адреса:</label>
            </td>
            <td>
              <input
                type="text"
                id="address"
                placeholder="Адреса"
                {...register('address', {
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
                {errors.address?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="telephone">Телефон:</label>
            </td>
            <td>
              <input
                type="tel"
                id="telephone"
                placeholder="Телефон"
                {...register('telephone', {
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
                {errors.telephone?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="birthDate">Дата народження:</label>
            </td>
            <td>
              <input
                type="date"
                id="birthDate"
                placeholder="День народження"
                {...register('birthdate', {
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
                {errors.birthdate?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="gender">Стать:</label>
            </td>
            <td>
              <select id="gender" {...register('gender')}>
                <option value="жіноча">жіноча</option>
                <option value="чоловіча">чоловіча</option>
              </select>
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>
              <span className="errorField">&nbsp;</span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="passportnumber">Номер паспорта:</label>
            </td>
            <td>
              <input
                type="text"
                id="passportNumber"
                placeholder="Номер паспорта"
                {...register('passportnumber', {
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
                {errors.passportnumber?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="jobname">Професія:</label>
            </td>
            <td>
              <input
                type="text"
                id="jobname"
                placeholder="Професія"
                {...register('jobname', {
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
                {errors.jobname?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="jobaddress">Місцезнаходження роботи:</label>
            </td>
            <td>
              <input
                type="text"
                id="jobaddress"
                placeholder="Місцезнаходження роботи"
                {...register('jobaddress', {
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
                {errors.jobaddress?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="login">Логін:</label>
            </td>
            <td>
              <input
                type="text"
                id="login"
                placeholder="Логін"
                {...register('login', {
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
                {errors.login?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Пароль:</label>
            </td>
            <td>
              <input
                type="password"
                id="password"
                placeholder="Пароль"
                {...register('password', {
                  required: 'Поле повинно бути заповнено',
                  minLength: {
                    value: 7,
                    message: 'Довжина пароля повинна бути не менше 7 символів',
                  },
                })}
              />
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>
              <span className="errorField">
                &nbsp;
                {errors.password?.message}
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
