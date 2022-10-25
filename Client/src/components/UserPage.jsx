import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../public/css/userPage.scss';
import Menu from './user/Menu';

export default function UserPage({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role);
  const splittedUrl = location.pathname.split('/');
  const [currentPage, setCurrentPage] = useState(
    splittedUrl.slice(2, splittedUrl.length).join('/'),
  );
  // const [verifyUser] = useLazyVerifyUserQuery();
  useLayoutEffect(() => {
    const roleFromPath = location.pathname.split('/')[1];
    let roleFromPathTranslated;

    if (roleFromPath === 'headdoctor') {
      roleFromPathTranslated = 'Головний лікар';
    } else if (roleFromPath === 'headofdepartment') {
      roleFromPathTranslated = 'Завідувач відділенням';
    } else if (roleFromPath === 'doctor') {
      roleFromPathTranslated = 'Лікар';
    } else if (roleFromPath === 'nurse') {
      roleFromPathTranslated = 'Медсестра';
    } else if (roleFromPath === 'patient') {
      roleFromPathTranslated = 'Пацієнт';
    } else {
      navigate(-1);
    }

    if (roleFromPathTranslated !== userRole) {
      navigate(-1);
    }
  }, [currentPage]);
  useEffect(() => {
    setCurrentPage(splittedUrl.slice(2, splittedUrl.length).join('/'));
  });
  return (
    <div className="userPage">
      <Menu />
      <div className="mainBlock">{children}</div>
    </div>
  );
}
