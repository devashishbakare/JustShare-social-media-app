import React from "react";
import style from "./aside.module.css";
import {
  FaRocketchat,
  FaRegNewspaper,
  FaUserFriends,
  FaBookmark,
  FaFileInvoiceDollar,
  FaFilm,
} from "react-icons/fa";
import {
  TbChartHistogram,
  TbCircuitBattery,
  TbShirtSport,
} from "react-icons/tb";
import { VscGlobe, VscRss } from "react-icons/vsc";
import profilePicture from "../../assets/user/img2.jpg";

const Aside = () => {
  return (
    <div className={style.asideContainer}>
      <div className={style.asideMenuWrapper}>
        <ul>
          <li className={style.menuList}>
            <VscRss className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Feed</span>
          </li>
          <li className={style.menuList}>
            <FaRocketchat className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Chat</span>
          </li>
          <li className={style.menuList}>
            <FaRegNewspaper className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>News</span>
          </li>
          <li className={style.menuList}>
            <FaUserFriends className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Friends</span>
          </li>
          <li className={style.menuList}>
            <FaBookmark className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Bookmarks</span>
          </li>
          <li className={style.menuList}>
            <img
              src={profilePicture}
              alt="profile img"
              className={style.asideMenuImg}
            />
            <span className={style.asideMenuText}>Profile</span>
          </li>
        </ul>
      </div>
      <div className={style.topNews}>
        <hr />
        <span className={style.topNewsHeading}>Top News</span>

        <ul>
          <li className={style.menuList}>
            <TbCircuitBattery className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Headlines</span>
          </li>
          <li className={style.menuList}>
            <VscGlobe className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>International</span>
          </li>
          <li className={style.menuList}>
            <FaFileInvoiceDollar className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Finance</span>
          </li>
          <li className={style.menuList}>
            <FaFilm className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Entertainment</span>
          </li>
          <li className={style.menuList}>
            <TbChartHistogram className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Market</span>
          </li>
          <li className={style.menuList}>
            <TbShirtSport className={style.asideMenuIcon} />
            <span className={style.asideMenuText}>Sports</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
