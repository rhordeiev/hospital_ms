/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import '../../../public/css/user/userInfoBlock.scss';
import '../../../public/css/user/showElements.scss';
import { useForm } from 'react-hook-form';
import {
  useDeleteDepartmentMutation,
  useLazyAggregateDepartmentsQuery,
  useLazyChangeViewDepartmentsQuery,
  useLazyGetDepartmentsQuery,
} from '../../../store/apis/headDoctorApi';

export default function ShowDepartmenstBlock() {
  const { register } = useForm();
  const [getDepartments] = useLazyGetDepartmentsQuery();
  const [changeViewDepartments] = useLazyChangeViewDepartmentsQuery();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const [aggregateDepartments] = useLazyAggregateDepartmentsQuery();
  const [dropdownParams, setDropdownParams] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [foundCount, setFoundCount] = useState(0);
  const filterRef = useRef();
  const sortRef = useRef();
  const sortdirectionRef = useRef();
  const searchRef = useRef();

  const aggregate = async () => {
    const aggregateResult = await aggregateDepartments({
      value: searchRef.current.value,
      filter: filterRef.current.value,
      sort: sortRef.current.value,
      sortdirection: sortdirectionRef.current.value,
    });
    setFoundCount(parseInt(aggregateResult.data.count, 10));
  };

  const deleteHeadOfDepartmentClick = async (e) => {
    await deleteDepartment(e.target.id);
    setDepartments(
      departments.filter((current) => current.id !== parseInt(e.target.id, 10)),
    );
    aggregate();
  };

  const onChange = async () => {
    if (searchRef.current.value.trim() === '') {
      setDepartments([]);
      setFoundCount(0);
    } else {
      const result = await changeViewDepartments({
        value: searchRef.current.value,
        filter: filterRef.current.value,
        sort: sortRef.current.value,
        sortdirection: sortdirectionRef.current.value,
      });
      setDepartments(result.data);
      aggregate();
    }
  };

  function SearchResult() {
    return departments.map((current) => (
      <div key={`listElement${current.id}`} className="listElement">
        <div className="elementName">
          {`${current.specialtyname}`}
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
            <span className="header">ПІБ завідувача відділення: </span>
            {current.headofdepartmentname}
          </div>
        </div>
      </div>
    ));
  }

  async function getParams() {
    const fetchedResult = (await getDepartments()).data;
    const propertiesNames = new Map();
    propertiesNames.set('specialtyname', 'назвою спеціальності');
    propertiesNames.set('headofdepartmentname', 'ПІБ завідувача відділенням');
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
