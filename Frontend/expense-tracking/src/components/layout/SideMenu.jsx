import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { userContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({activeMenu}) => {
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
    <div className="w-64 h-[calc(100vh-61px)] bg-slate-100 border-slate-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img
          src={user?.profileImageUrl || ""}
          alt= "Profile Image"
          className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ):(<></>) }
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.fullName || ""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index)=> (
        <button key={`menu_${index}`} 
           className={`w-full flex items-center gap-4 text-[15px] ${activeMenu == item.title ? 'text-white bg-slate-700': ""} py-3 px-6 rounded-lg mb-3 `}
           onClick={() => handleClick(item.path) }
        >
          <item.icon className="text-xl"/>
          {item.title}
        </button>
      )
      )} 
      
    </div>
  )
}

export default SideMenu;