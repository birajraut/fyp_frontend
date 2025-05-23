import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store/store';


interface IProps {
  children: React.ReactNode
}

const UserPrivateRoute = ({ children }: IProps) => {
  const navigate = useNavigate();
  const { loginAs } = useSelector((state: RootState) => state?.auth);


  useEffect(() => {
    if (loginAs !== 'RESTAURANT') {
      localStorage.clear()
      navigate('/login', { replace: true });
    }
  }, [loginAs, navigate]);

  // Return Outlet only if user exists, otherwise null during redirection
  //   return user ? <Outlet /> : null;

  // return <Outlet />;


  return children
};

export default UserPrivateRoute;
