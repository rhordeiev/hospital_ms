/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  useDeletePatientMutation,
  useUpdateMutation,
} from '../../../store/apis/patientApi';
import { setPatientInfo } from '../../../store/slices/patientSlice';

export default function PatientInfoBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const id = useSelector((state) => state.user.id);
  const [name, setName] = useState(useSelector((state) => state.patient.name));
  const [surname, setSurname] = useState(
    useSelector((state) => state.patient.surname),
  );
  const [patronymic, setPatronymic] = useState(
    useSelector((state) => state.patient.patronymic),
  );
  const [address, setAddress] = useState(
    useSelector((state) => state.patient.address),
  );
  const [telephone, setTelephone] = useState(
    useSelector((state) => state.patient.telephone),
  );
  const [birthDate, setBirthDate] = useState(
    useSelector((state) => state.patient.birthDate),
  );
  const [gender, setGender] = useState(
    useSelector((state) => state.patient.gender),
  );
  const [passportNumber, setPassportNumber] = useState(
    useSelector((state) => state.patient.passportNumber),
  );
  const [jobName, setJobName] = useState(
    useSelector((state) => state.patient.jobName),
  );
  const [jobAddress, setJobAddress] = useState(
    useSelector((state) => state.patient.jobAddress),
  );
  const [login, setLogin] = useState(
    useSelector((state) => state.patient.login),
  );
  const [password, setPassword] = useState(
    useSelector((state) => state.patient.password),
  );
  const patientId = useSelector((state) => state.user.id);
  const [update] = useUpdateMutation();
  const [deletePatient] = useDeletePatientMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (enteredData) => {
    Object.defineProperty(enteredData, 'oldLogin', {
      value: login,
    });
    const data = { ...enteredData, oldLogin: login };
    const result = await update({ id, body: data });
    setName(data.name);
    setSurname(data.surname);
    setPatronymic(data.patronymic);
    setAddress(data.address);
    setTelephone(data.telephone);
    setBirthDate(new Date(data.birthdate));
    setGender(data.gender);
    setPassportNumber(data.passportnumber);
    setJobName(data.jobname);
    setJobAddress(data.jobaddress);
    setLogin(data.login);
    setPassword(data.password);
    document.cookie = `token=${result.data.token}; max-age=${
      result.data.expirationTime / 1000
    }`;
    dispatch(setPatientInfo(enteredData));
  };

  const deletePatientClick = async () => {
    await deletePatient(patientId);
    navigate('/logoff');
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
              <label htmlFor="surname">Прізвище:</label>
            </td>
            <td>
              <input
                type="text"
                id="surname"
                placeholder="Прізвище"
                defaultValue={surname}
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
                defaultValue={patronymic}
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
                defaultValue={address}
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
                defaultValue={telephone}
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
                defaultValue={new Date(birthDate)
                  .toISOString()
                  .substring(0, 10)}
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
              <select id="gender" defaultValue={gender} {...register('gender')}>
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
                defaultValue={passportNumber}
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
                defaultValue={jobName}
                {...register('jobname')}
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
                defaultValue={jobAddress}
                {...register('jobaddress')}
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
                defaultValue={login}
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
                defaultValue={password}
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
              <button
                type="button"
                className="deleteButton"
                onClick={deletePatientClick}
              >
                Видалити
              </button>
              <button type="submit">Зберегти</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
