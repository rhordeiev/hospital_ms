/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import { useSelector } from 'react-redux';
import { useLazyGetPatientsCurrentTreatmentQuery } from '../../../store/apis/patientApi';

export default function AssignTreatmentBlock() {
  const [getCurrentTreatment] = useLazyGetPatientsCurrentTreatmentQuery();
  const patientId = useSelector((state) => state.user.id);
  const [diagnosis, setDiagnosis] = useState('');
  const [meds, setMeds] = useState('');
  const [note, setNote] = useState('');

  async function fetchCurrentTreatment() {
    const fetchedResult = (await getCurrentTreatment(patientId)).data;
    return fetchedResult;
  }

  useEffect(() => {
    fetchCurrentTreatment().then((result) => {
      setDiagnosis(result.diagnosis);
      setMeds(result.meds);
      setNote(result.note);
    });
  }, []);

  return (
    <form className="userInfoBlock">
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="diagnosis">Діагноз:</label>
            </td>
            <td>
              <input
                type="text"
                id="diagnosis"
                placeholder="Діагноз"
                value={diagnosis}
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
              <label htmlFor="meds">Ліки:</label>
            </td>
            <td>
              <input
                type="text"
                id="meds"
                placeholder="Ліки"
                value={meds}
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
              <label htmlFor="note">Примітка:</label>
            </td>
            <td>
              <textarea
                id="note"
                placeholder="Примітка"
                value={note}
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
        </tbody>
      </table>
    </form>
  );
}
