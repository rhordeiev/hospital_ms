/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import '../../../public/css/user/showElements.scss';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  useLazyGetPatientsHistoryOfIllnessesQuery,
  useLazyAggregateHistoryOfIllnessesQuery,
  useLazyGetHistoryOfIllnessesParamsQuery,
} from '../../../store/apis/doctorApi';

export default function ShowHeadsOfDepartmentsBlock() {
  const { register } = useForm();
  const [getHistoryOfIllnessesParams] =
    useLazyGetHistoryOfIllnessesParamsQuery();
  const [getPatientsHistoryOfIllnesses] =
    useLazyGetPatientsHistoryOfIllnessesQuery();
  const [aggregateHistoryOfIllnesses] =
    useLazyAggregateHistoryOfIllnessesQuery();
  const [dropdownParams, setDropdownParams] = useState([]);
  const [historyOfIllnesses, setHistoryOfIllnesses] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const sortRef = useRef();
  const sortdirectionRef = useRef();
  const patientId = useSelector((state) => state.user.id);

  const aggregate = async () => {
    const aggregateResult = await aggregateHistoryOfIllnesses(patientId);
    setFoundCount(parseInt(aggregateResult.data.count, 10));
  };

  const getPatientHistoryOfIllnesses = async () => {
    const result = await getPatientsHistoryOfIllnesses({
      id: patientId,
      sort: sortRef.current.value,
      sortdirection: sortdirectionRef.current.value,
    });
    return result;
  };

  const onChange = async () => {
    const result = await getPatientHistoryOfIllnesses();
    setHistoryOfIllnesses(result.data);
    aggregate();
  };

  function SearchResult() {
    return historyOfIllnesses.map((current, index) => (
      <div key={`listElement${index}`} className="listElement">
        <div className="elementData">
          <div>
            <span className="header">Дата прибуття: </span>
            {current.arrivaldate.split('T')[0]}
            <br />
            <span className="header">Дата виписки: </span>
            {current.departuredate
              ? current.departuredate.split('T')[0]
              : current.departuredate}
            <br />
            <span className="header">Прізвище лікаря: </span>
            {current.doctorsurname}
            <br />
            <span className="header">Ім&apos;я лікаря: </span>
            {current.doctorname}
            <br />
            <span className="header">По батькові лікаря: </span>
            {current.doctorpatronymic}
            <br />
          </div>
          <div>
            <span className="header">Діагноз: </span>
            {current.diagnosis}
            <br />
            <span className="header">Ліки: </span>
            {current.meds}
            <br />
            <span className="header">Примітка: </span>
            {current.note}
            <br />
            <span className="header">Виліковано: </span>
            {current.treatmentsuccess ? 'Так' : 'Ні'}
            <br />
          </div>
        </div>
      </div>
    ));
  }

  async function getParams() {
    const fetchedResult = (await getHistoryOfIllnessesParams()).data;
    const propertiesNames = new Map();
    propertiesNames.set('name', "ім'ям лікаря");
    propertiesNames.set('surname', 'прізвищем лікаря');
    propertiesNames.set('patronymic', 'по батькові лікаря');
    propertiesNames.set('arrivaldate', 'датою звертання');
    propertiesNames.set('departuredate', 'датою виписки');
    propertiesNames.set('diagnosis', 'діагнозом');
    propertiesNames.set('meds', 'за ліками');
    propertiesNames.set('note', 'за приміткою');
    const renderedResult = [];
    for (const [innerKey] of Object.entries(fetchedResult)) {
      if (innerKey === 'treatmentsuccess') {
        renderedResult.push(
          <option key="treatmentSuccess" value="treatmentSuccess">
            вдалим лікуванням
          </option>,
        );
        renderedResult.push(
          <option key="treatmentFailure" value="treatmentFailure">
            невдалим лікуванням
          </option>,
        );
      } else {
        renderedResult.push(
          <option key={innerKey} value={innerKey}>
            {`${propertiesNames.get(innerKey)}`}
          </option>,
        );
      }
    }
    return renderedResult;
  }

  useEffect(() => {
    getParams().then((params) => {
      setDropdownParams(params);
      getPatientHistoryOfIllnesses().then((patientHistoryOfIllnesses) => {
        setHistoryOfIllnesses(patientHistoryOfIllnesses.data);
        aggregate();
      });
    });
  }, []);

  return (
    <div className="userInfoBlock flexBlock">
      <div className="searchBlock">
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="header">сортувати за: </span>
                  <select
                    name="sort"
                    id="sort"
                    {...register('sort')}
                    ref={sortRef}
                    onChange={onChange}
                  >
                    {dropdownParams}
                  </select>
                </td>
                <td>
                  <span className="header">порядок: </span>
                  <select
                    name="sortdirection"
                    id="sortdirection"
                    {...register('sortdirection')}
                    ref={sortdirectionRef}
                    onChange={onChange}
                  >
                    <option value="ASC">зростаючий</option>
                    <option value="DESC">спадний</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="searchResultInfo">
        <span className="header">Знайдено: </span>
        {foundCount}
      </div>
      <div className="searchResultBlock">
        <SearchResult />
      </div>
    </div>
  );
}
