import React, { useContext, useState } from "react";
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
import axios from "axios";
import { baseUrl } from "../constants";
import BookmarkContext from "../../Contex/BookmarkContext";
// import profilePicture from "../../assets/user/img2.jpg";

const Aside = () => {
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userId = user._id;
  const { profilePicture } = user;

  const { setBookMarks, setIsBookmarkClick } = useContext(BookmarkContext);

  // Fetching bookmark post from backend
  const getBookmarkPost = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(
        `${baseUrl}/user/bookmarkPosts/${userId}`,
        config
      );

      if (response.status === 200) {
        console.log("data", response.data.allBookmarkPost);
        setBookMarks(response.data.allBookmarkPost);
        setIsBookmarkClick(true);
      } else {
        //todo : handle this error gracefully
      }
    } catch (error) {
      //todo : handle this error gracefully
      console.log("Feching bookmark failed");
    }
  };

  // toggeling feed from bookmark or news
  const getFeed = () => {
    setIsBookmarkClick(!FaBookmark);
  };

  return (
    <div className={style.asideContainer}>
      <div className={style.asideMenuWrapper}>
        <ul>
          <li className={style.menuList}>
            <VscRss className={style.asideMenuIcon} />
            <span className={style.asideMenuText} onClick={getFeed}>
              Feed
            </span>
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
            <span className={style.asideMenuText} onClick={getBookmarkPost}>
              Bookmarks
            </span>
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
