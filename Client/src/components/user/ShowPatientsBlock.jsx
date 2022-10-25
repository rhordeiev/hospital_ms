/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import '../../../public/css/user/showElements.scss';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  useUpdatePatientTreatmentStatusMutation,
  useLazyAggregatePatientsQuery,
  useLazyChangeViewPatientsQuery,
  useLazyGetDoctorsPatientsQuery,
} from '../../../store/apis/doctorApi';

export default function ShowHeadsOfDepartmentsBlock() {
  const { register } = useForm();
  const [getPatients] = useLazyGetDoctorsPatientsQuery();
  const [changeViewPatients] = useLazyChangeViewPatientsQuery();
  const [updatePatientTreatmentStatus] =
    useUpdatePatientTreatmentStatusMutation();
  const [aggregatePatients] = useLazyAggregatePatientsQuery();
  const [dropdownParams, setDropdownParams] = useState([]);
  const [patients, setPatients] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const filterRef = useRef();
  const sortRef = useRef();
  const sortdirectionRef = useRef();
  const searchRef = useRef();
  const doctorId = useSelector((state) => state.user.id);

  const aggregate = async () => {
    const aggregateResult = await aggregatePatients({
      value: searchRef.current.value,
      filter: filterRef.current.value,
      sort: sortRef.current.value,
      sortdirection: sortdirectionRef.current.value,
      doctorId,
    });
    setFoundCount(parseInt(aggregateResult.data.count, 10));
  };

  const updatePatientTreatmentStatusClick = async (e) => {
    if (e.target.textElement === 'done') {
      await updatePatientTreatmentStatus({
        patientId: e.target.parentNode.parentNode.parentNode.id,
        doctorId,
        body: { treatmentSuccess: true },
      });
    } else {
      await updatePatientTreatmentStatus({
        patientId: e.target.parentNode.parentNode.parentNode.id,
        doctorId,
        body: { treatmentSuccess: false },
      });
    }
    setPatients(
      patients.filter(
        (current) =>
          current.id !==
          parseInt(e.target.parentNode.parentNode.parentNode.id, 10),
      ),
    );
    aggregate();
  };

  const onChange = async () => {
    if (searchRef.current.value.trim() === '') {
      setPatients([]);
      setFoundCount(0);
    } else {
      const result = await changeViewPatients({
        value: searchRef.current.value,
        filter: filterRef.current.value,
        sort: sortRef.current.value,
        sortdirection: sortdirectionRef.current.value,
        doctorId,
      });
      setPatients(result.data);
      aggregate();
    }
  };

  function SearchResult() {
    return patients.map((current) => (
      <div
        key={`listElement${current.id}`}
        className="listElement"
        id={current.id}
      >
        <div className="elementName">
          {`${current.surname} ${current.name} ${current.patronymic}`}
          <button type="button">
            <span className="material-icons-outlined elementIcon deleteIcon">
              close
            </span>
          </button>
          <button type="button">
            <span className="material-icons-outlined elementIcon">done</span>
          </button>
        </div>
        <div className="elementData">
          <div>
            <span className="header">Адреса: </span>
            {current.address}
            <br />
            <span className="header">Телефон: </span>
            {current.telephone}
            <br />
            <span className="header">Дата народження: </span>
            {current.birthdate.split('T')[0]}
            <br />
            <span className="header">Стать: </span>
            {current.gender}
            <br />
          </div>
          <div>
            <span className="header">Номер паспорта: </span>
            {current.passportnumber}
            <br />
            <span className="header">Професія: </span>
            {current.jobname}
            <br />
            <span className="header">Місцезнаходження роботи: </span>
            {current.jobaddress}
            <br />
          </div>
        </div>
      </div>
    ));
  }

  async function getParams() {
    const fetchedResult = (await getPatients(doctorId)).data;
    const propertiesNames = new Map();
    propertiesNames.set('name', "ім'ям");
    propertiesNames.set('surname', 'прізвищем');
    propertiesNames.set('patronymic', 'по батькові');
    propertiesNames.set('address', 'адресою');
    propertiesNames.set('telephone', 'телефоном');
    propertiesNames.set('birthdate', 'датою народження');
    propertiesNames.set('jobname', 'професією');
    propertiesNames.set('jobaddress', 'місцезнаходженням роботи');
    propertiesNames.set('gender', 'статю');
    propertiesNames.set('passportnumber', 'номером паспорта');
    const renderedResult = [];
    for (const [innerKey] of Object.entries(fetchedResult[0])) {
      if (
        !['id', 'login', 'password', 'roleid', 'doctorid'].includes(innerKey)
      ) {
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
    getParams().then((result) => {
      setDropdownParams(result);
    });
  }, []);

  useEffect(() => {
    const elements = document.getElementsByClassName('elementIcon');
    Array.from(elements).forEach((current) => {
      current.addEventListener('click', updatePatientTreatmentStatusClick);
    });
  });

  return (
    <div className="userInfoBlock flexBlock">
      <div className="searchBlock">
        <div>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Пошук"
            {...register('search')}
            ref={searchRef}
            onChange={onChange}
          />
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="header">фільтрувати за: </span>
                  <select
                    name="filter"
                    id="filter"
                    {...register('filter')}
                    ref={filterRef}
                    onChange={onChange}
                  >
                    {dropdownParams}
                  </select>
                </td>
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
              </tr>
              <tr>
                <td> </td>
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
