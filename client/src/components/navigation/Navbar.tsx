import React, { FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { menuItemsData } from "../../utils/data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar: FC = () => {
  return (
    <nav className={style["header-nav"]}>
      <ul className={style["menu-items"]}>
        {menuItemsData.map((item) => (
          <Link to={item.url}>
            <li className={style["menu-item"]} key={item.id}>
              <div className={style.icon}>
                  <FontAwesomeIcon icon={item.icon as IconProp}/>
              </div>
              <div className={style.title}>{item.title}</div>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
