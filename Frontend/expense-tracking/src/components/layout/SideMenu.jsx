import React, { useContext } from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { userContext } from '../../context/userContext'

const SideMenu = () => {
    const { user, clearUser } = useContext(userContext);

    const navigate = useNavigate();
  return (
    <div>SideMenu</div>
  )
}

export default SideMenu