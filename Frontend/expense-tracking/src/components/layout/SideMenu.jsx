import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { userContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const { user, clearUser } = useContext(userContext);

    const navigate = useNavigate();

    const handleClick = (path) => {
        if(path === 'logout') {
            handleLogout();
            return;
        }
        navigate(path);
    }

    const handleLogout = () => {
        clearUser();
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div>SideMenu</div>
  )
}

export default SideMenu