/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  useLazyGetDoctorsPatientsQuery,
  useAddTreatmentMutation,
} from '../../../store/apis/doctorApi';

export default function AssignTreatmentBlock() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [getPatients] = useLazyGetDoctorsPatientsQuery();
  const [addTreatment] = useAddTreatmentMutation();
  const [patients, setPatients] = useState([]);
  const patientsRef = useRef();
  const doctorId = useSelector((state) => state.user.id);

  const onSubmit = async (enteredData) => {
    await addTreatment({
      ...enteredData,
      patientId: patientsRef.current.value,
      doctorId,
    });
  };

  async function fetchPatients() {
    const fetchedResult = (await getPatients(doctorId)).data;
    const renderedResult = fetchedResult.map((current) => (
      <option key={current.id} value={current.id}>
        {`${current.surname} ${current.name} ${current.patronymic}`}
      </option>
    ));
    return renderedResult;
  }

  useEffect(() => {
    fetchPatients().then((result) => {
      setPatients(result);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="userInfoBlock">
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="patients">Пацієнти:</label>
            </td>
            <td>
              <select id="patients" {...register('patients')} ref={patientsRef}>
                {patients}
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
              <label htmlFor="diagnosis">Діагноз:</label>
            </td>
            <td>
              <input
                type="text"
                id="diagnosis"
                placeholder="Діагноз"
                {...register('diagnosis', {
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
                {errors.diagnosis?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="meds">Ліки:</label>
            </td>
            <td>
              <input
                type="text"
                id="meds"
                placeholder="Ліки"
                {...register('meds', {
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
                {errors.meds?.message}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="note">Примітка:</label>
            </td>
            <td>
              <textarea
                id="note"
                placeholder="Примітка"
                {...register('note')}
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
            <td colSpan={2}>
              <button type="submit">Додати</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
