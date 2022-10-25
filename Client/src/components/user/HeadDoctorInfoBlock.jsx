/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useUpdateMutation } from '../../../store/apis/headDoctorApi';
import { setHeadDoctorInfo } from '../../../store/slices/headDoctorSlice';

export default function HeadDoctorInfoBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const id = useSelector((state) => state.user.id);
  const [name, setName] = useState(
    useSelector((state) => state.headDoctor.name),
  );
  const [surname, setSurname] = useState(
    useSelector((state) => state.headDoctor.surname),
  );
  const [patronymic, setPatronymic] = useState(
    useSelector((state) => state.headDoctor.patronymic),
  );
  const [address, setAddress] = useState(
    useSelector((state) => state.headDoctor.address),
  );
  const [telephone, setTelephone] = useState(
    useSelector((state) => state.headDoctor.telephone),
  );
  const [birthDate, setBirthDate] = useState(
    useSelector((state) => state.headDoctor.birthDate),
  );
  const [gender, setGender] = useState(
    useSelector((state) => state.headDoctor.gender),
  );
  const [passportNumber, setPassportNumber] = useState(
    useSelector((state) => state.headDoctor.passportNumber),
  );
  const [login, setLogin] = useState(
    useSelector((state) => state.headDoctor.login),
  );
  const [password, setPassword] = useState(
    useSelector((state) => state.headDoctor.password),
  );
  const [update] = useUpdateMutation();
  const dispatch = useDispatch();

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
    setLogin(data.login);
    setPassword(data.password);
    document.cookie = `token=${result.data.token}; max-age=${
      result.data.expirationTime / 1000
    }`;
    dispatch(setHeadDoctorInfo(enteredData));
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
              <button type="submit">Зберегти</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
