/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import '../../../public/css/user/showElements.scss';
import { useForm } from 'react-hook-form';
import {
  useDeleteHeadOfDepartmentMutation,
  useLazyAggregateHeadsOfDepartmentsInfoQuery,
  useLazyChangeViewHeadsOfDepartmentsInfoQuery,
  useLazyGetHeadsOfDepartmentsInfoQuery,
} from '../../../store/apis/headDoctorApi';

export default function ShowHeadsOfDepartmentsBlock() {
  const { register } = useForm();
  const [getHeadsOfDepartments] = useLazyGetHeadsOfDepartmentsInfoQuery();
  const [changeViewHeadsOfDepartments] =
    useLazyChangeViewHeadsOfDepartmentsInfoQuery();
  const [deleteHeadOfDepartment] = useDeleteHeadOfDepartmentMutation();
  const [aggregateHeadsOfDepartments] =
    useLazyAggregateHeadsOfDepartmentsInfoQuery();
  const [dropdownParams, setDropdownParams] = useState([]);
  const [headsOfDepartments, setHeadsOfDepartments] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const filterRef = useRef();
  const sortRef = useRef();
  const sortdirectionRef = useRef();
  const searchRef = useRef();

  const aggregate = async () => {
    const aggregateResult = await aggregateHeadsOfDepartments({
      value: searchRef.current.value,
      filter: filterRef.current.value,
      sort: sortRef.current.value,
      sortdirection: sortdirectionRef.current.value,
    });
    setFoundCount(parseInt(aggregateResult.data.count, 10));
  };

  const deleteHeadOfDepartmentClick = async (e) => {
    await deleteHeadOfDepartment(e.target.id);
    setHeadsOfDepartments(
      headsOfDepartments.filter(
        (current) => current.id !== parseInt(e.target.id, 10),
      ),
    );
    aggregate();
  };

  const onChange = async () => {
    if (searchRef.current.value.trim() === '') {
      setHeadsOfDepartments([]);
      setFoundCount(0);
    } else {
      const result = await changeViewHeadsOfDepartments({
        value: searchRef.current.value,
        filter: filterRef.current.value,
        sort: sortRef.current.value,
        sortdirection: sortdirectionRef.current.value,
      });
      setHeadsOfDepartments(result.data);
      aggregate();
    }
  };

  function SearchResult() {
    return headsOfDepartments.map((current) => (
      <div key={`listElement${current.id}`} className="listElement">
        <div className="elementName">
          {`${current.surname} ${current.name} ${current.patronymic}`}
          <button type="button">
            <span
              className="material-icons-outlined elementIcon"
              id={current.id}
            >
              delete
            </span>
          </button>
        </div>
        <div className="elementData">
          <div>
            <span className="header">????????????: </span>
            {current.address}
            <br />
            <span className="header">??????????????: </span>
            {current.telephone}
            <br />
            <span className="header">???????? ????????????????????: </span>
            {current.birthdate.split('T')[0]}
            <br />
            <span className="header">??????????: </span>
            {current.gender}
            <br />
          </div>
          <div>
            <span className="header">?????????? ????????????????: </span>
            {current.passportnumber}
            <br />
            <span className="header">????????????????: </span>
            {current.salary}
            <br />
            <span className="header">?????? ????????????: </span>
            {current.workingtime}
            <br />
            <span className="header">?????? ????????????: </span>
            {current.workingdays}
            <br />
          </div>
        </div>
      </div>
    ));
  }

  async function getParams() {
    const fetchedResult = (await getHeadsOfDepartments()).data;
    const propertiesNames = new Map();
    propertiesNames.set('name', "????'????");
    propertiesNames.set('surname', '??????????????????');
    propertiesNames.set('patronymic', '???? ????????????????');
    propertiesNames.set('address', '??????????????');
    propertiesNames.set('telephone', '??????????????????');
    propertiesNames.set('birthdate', '?????????? ????????????????????');
    propertiesNames.set('workingtime', '?????????? ????????????');
    propertiesNames.set('workingdays', '???????????????? ??????????');
    propertiesNames.set('gender', '??????????');
    propertiesNames.set('passportnumber', '?????????????? ????????????????');
    propertiesNames.set('salary', '??????????????????');
    const renderedResult = [];
    for (const [innerKey] of Object.entries(fetchedResult[0])) {
      if (innerKey !== 'id') {
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
      current.addEventListener('click', deleteHeadOfDepartmentClick);
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
            placeholder="??????????"
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
                  <span className="header">?????????????????????? ????: </span>
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
                  <span className="header">?????????????????? ????: </span>
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
                  <span className="header">??????????????: </span>
                  <select
                    name="sortdirection"
                    id="sortdirection"
                    {...register('sortdirection')}
                    ref={sortdirectionRef}
                    onChange={onChange}
                  >
                    <option value="ASC">????????????????????</option>
                    <option value="DESC">??????????????</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="searchResultInfo">
        <span className="header">????????????????: </span>
        {foundCount}
      </div>
      <div className="searchResultBlock">
        <SearchResult />
      </div>
    </div>
  );
}
