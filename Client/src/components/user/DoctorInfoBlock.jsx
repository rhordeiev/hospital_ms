/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useUpdateMutation } from '../../../store/apis/doctorApi';
import { setDoctorInfo } from '../../../store/slices/doctorSlice';

export default function DoctorInfoBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const id = useSelector((state) => state.user.id);
  const [name, setName] = useState(useSelector((state) => state.doctor.name));
  const [surname, setSurname] = useState(
    useSelector((state) => state.doctor.surname),
  );
  const [patronymic, setPatronymic] = useState(
    useSelector((state) => state.doctor.patronymic),
  );
  const [address, setAddress] = useState(
    useSelector((state) => state.doctor.address),
  );
  const [telephone, setTelephone] = useState(
    useSelector((state) => state.doctor.telephone),
  );
  const [birthDate, setBirthDate] = useState(
    useSelector((state) => state.doctor.birthDate),
  );
  const [gender, setGender] = useState(
    useSelector((state) => state.doctor.gender),
  );
  const [passportNumber, setPassportNumber] = useState(
    useSelector((state) => state.doctor.passportNumber),
  );
  const [workingTime] = useState(
    useSelector((state) => state.doctor.workingTime),
  );
  const [workingDays] = useState(
    useSelector((state) => state.doctor.workingDays),
  );
  const [cabinet] = useState(useSelector((state) => state.doctor.cabinet));
  const [salary] = useState(useSelector((state) => state.doctor.salary));
  const [login, setLogin] = useState(
    useSelector((state) => state.doctor.login),
  );
  const [password, setPassword] = useState(
    useSelector((state) => state.doctor.password),
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
    dispatch(setDoctorInfo(enteredData));
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
              <label htmlFor="workingdays">Дні роботи:</label>
            </td>
            <td>
              <input
                type="text"
                id="workingdays"
                placeholder="Дні роботи"
                defaultValue={workingDays}
                {...register('workingdays')}
                disabled
              />
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
              <label htmlFor="workingtime">Час роботи:</label>
            </td>
            <td>
              <input
                type="text"
                id="workingtime"
                placeholder="Час роботи"
                defaultValue={workingTime}
                {...register('workingtime')}
                disabled
              />
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
              <label htmlFor="cabinet">Кабінет:</label>
            </td>
            <td>
              <input
                type="text"
                id="cabinet"
                placeholder="Кабінет"
                defaultValue={cabinet}
                {...register('cabinet')}
                disabled
              />
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
              <label htmlFor="salary">Зарплата:</label>
            </td>
            <td>
              <input
                type="text"
                id="salary"
                placeholder="Зарплата"
                defaultValue={salary}
                {...register('salary')}
                disabled
              />
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
