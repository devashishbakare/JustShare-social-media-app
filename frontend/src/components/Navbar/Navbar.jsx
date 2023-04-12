import React from "react";
import style from "./navbar.module.css";
import { FaSearch, FaRegBell, FaRocketchat } from "react-icons/fa";
const Navbar = () => {
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userProfilePhoto = user.profilePicture;
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navLeft}>
          <div className={style.navHeading}>Justshare</div>
        </div>

        <div className={style.navMiddle}>
          <div className={style.searchBar}>
            <FaSearch className={style.searchIcon} />
            <input
              className={style.seachInputFeild}
              placeholder="Search your friend .."
            />
          </div>
        </div>

        <div className={style.navRight}>
          <div className={style.navRightText}>
            <span className={style.navRightButton}>HomePage</span>
            <span className={style.navRightButton}>Timeline</span>
          </div>

          <div className={style.iconDiv}>
            <FaRocketchat className={style.navRightIcon} />
            <span className={style.iconBadge}>5</span>
          </div>
          <div className={style.iconDiv}>
            <FaRegBell className={style.navRightIcon} />
            <span className={style.iconBadge}>1</span>
          </div>
          <img
            src={userProfilePhoto}
            alt="profile img"
            className={style.navBarImg}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
