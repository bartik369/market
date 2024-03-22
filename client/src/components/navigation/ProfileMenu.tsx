import React, { FC, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { profileMenuData } from "../../utils/data/data";
import { useAppSelector } from "../../hooks/reduxHook";
import { useLogoutUserMutation } from "../../store/authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import style from "./ProfileMenu.module.css";

interface IProfileMenuProps {
    setProfileMenu: (profileMenu: boolean) => void;
    profileMenu: boolean;
}

const ProfileMenu: FC<IProfileMenuProps> = ({setProfileMenu, profileMenu}) => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [logoutUser] = useLogoutUserMutation()

  useEffect(() => {
    user && user.roles?.map((role) => {
      if (role === "ADMIN") {
        setIsAdmin(true);
      }
    });
  }, [user]);

  const logoutHandler = () => {
    logoutUser()
    setProfileMenu(!profileMenu)
  }

  return (
    <div className={style['profile-menu']}>
        <ul className={style.items}>
          {profileMenuData.map((item, index) =>
            !isAdmin && item.url === "/admin" ? null : (
              <li key={index}>
                 <NavLink className={({ isActive }) => (isActive 
                  ? style.active 
                  : style[''])} to={item.url} key={item.id}>
                    {item.title}
                  </NavLink>
                {/* <Link to={item.url}>{item.title}</Link> */}
              </li>
            )
            // icon={item.iconClassName}
          )}
        </ul>
      
      <button className={style.logout} onClick={() => logoutHandler()}>
      {/* <FontAwesomeIcon className={style['logout-icon']} icon={faArrowRightFromBracket} /> */}
      выйти
      </button>
    </div>
  );
};

export default ProfileMenu;
