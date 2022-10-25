/* eslint-disable prefer-destructuring */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../public/css/user/menu.scss';
import menuDataJSON from '../../../public/json/menuData.json';

function MenuItems() {
  let menuData;
  const location = useLocation();
  const roleType = location.pathname.split('/')[1];
  if (roleType === 'headdoctor') {
    menuData = menuDataJSON.headdoctor;
  } else if (roleType === 'headofdepartment') {
    menuData = menuDataJSON.headofdepartment;
  } else if (roleType === 'doctor') {
    menuData = menuDataJSON.doctor;
  } else if (roleType === 'patient') {
    menuData = menuDataJSON.patient;
  }
  const elementsToRender = [];
  for (const [key, value] of Object.entries(menuData)) {
    let tempRouteInfoArray = [];
    let renderedDropdowns = [];
    let headerFieldValue;
    for (const [firstInnerKey, firstInnerValue] of Object.entries(value)) {
      if (typeof firstInnerValue === 'object') {
        for (const [secondInnerKey, secondInnerValue] of Object.entries(
          firstInnerValue,
        )) {
          tempRouteInfoArray.push({
            key: secondInnerKey,
            value: secondInnerValue,
          });
        }
        if (firstInnerKey === 'header') {
          headerFieldValue = tempRouteInfoArray[0].value;
          tempRouteInfoArray = [];
        } else {
          renderedDropdowns.push(
            <li key={key + firstInnerKey + tempRouteInfoArray[0].key}>
              <Link to={tempRouteInfoArray[1].value}>
                {`${headerFieldValue} ${tempRouteInfoArray[0].value}`}
              </Link>
            </li>,
          );
          tempRouteInfoArray = [];
        }
      } else {
        tempRouteInfoArray.push({ key: firstInnerKey, value: firstInnerValue });
      }
    }
    if (renderedDropdowns.length) {
      elementsToRender.push(
        <li key={key}>
          {headerFieldValue}
          <ul className="dropdown">{renderedDropdowns}</ul>
        </li>,
      );
      renderedDropdowns = [];
    } else {
      elementsToRender.push(
        <li key={key + tempRouteInfoArray[0].key}>
          <Link to={tempRouteInfoArray[1].value}>
            {tempRouteInfoArray[0].value}
          </Link>
        </li>,
      );
    }
  }
  return <ul className="menuList">{elementsToRender}</ul>;
}

export default function Menu() {
  return (
    <div className="menu">
      <MenuItems />
    </div>
  );
}
