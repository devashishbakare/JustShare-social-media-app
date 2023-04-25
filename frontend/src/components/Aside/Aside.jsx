import React, { useContext, useState } from "react";
import style from "./aside.module.css";
import {
  FaRocketchat,
  FaRegNewspaper,
  FaBookmark,
  FaFileInvoiceDollar,
  FaFilm,
  FaHandHoldingMedical,
  FaReact,
} from "react-icons/fa";
import { TbShirtSport } from "react-icons/tb";
import { MdSettingsInputAntenna } from "react-icons/md";
import { VscGlobe, VscRss } from "react-icons/vsc";
import axios from "axios";
import { baseUrl } from "../constants";
import ContentContext from "../../Contex/ContentContext";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userId = user._id;
  const { profilePicture } = user;
  const navigate = useNavigate();
  const { setBookMarks, setIsBookmarkClick } = useContext(ContentContext);
  const { setIsNewsClick, setNews, setIsCategoryClick } =
    useContext(ContentContext);

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
        // console.log("data", response.data.allBookmarkPost);
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
    setIsBookmarkClick(false);
    setIsNewsClick(false);
    setIsCategoryClick(false);
  };

  const setNewsClick = async () => {
    const apiKey = "43a9a8bb1a1a4bf2b933419dc7a6d38d";
    const url = "https://newsapi.org/v2/top-headlines?country=us";

    try {
      const response = await fetch(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      const data = await response.json();
      // console.log(data.articles);
      setNews(data.articles);
      setIsBookmarkClick(false);
      setIsNewsClick(true);
    } catch (error) {
      console.log(error, "error in fetching news from api");
    }
  };

  const fetchCatagoryNews = async (categoryType) => {
    const apiKey = "43a9a8bb1a1a4bf2b933419dc7a6d38d";
    const url = `https://newsapi.org/v2/top-headlines/sources?category=${categoryType}`;

    try {
      const response = await fetch(url, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });
      const data = await response.json();
      // console.log(data.sources);
      setNews(data.sources);
      setIsBookmarkClick(false);
      setIsNewsClick(false);
      setIsCategoryClick(true);
    } catch (error) {
      console.log(error, "error in fetching news from api");
    }
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
            <span className={style.asideMenuText} onClick={setNewsClick}>
              News
            </span>
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
            <span
              className={style.asideMenuText}
              onClick={() => navigate("/profile", { state: userId })}
              // navigate('/create', { state: { duplicateLifecycle } })
            >
              Profile
            </span>
          </li>
        </ul>
      </div>
      <div className={style.topNews}>
        <hr />
        <span className={style.topNewsHeading}>Top News</span>

        <ul>
          <li className={style.menuList}>
            <VscGlobe className={style.asideMenuIcon} />
            <span
              className={style.asideMenuText}
              onClick={() => fetchCatagoryNews("general")}
            >
              General
            </span>
          </li>
          <li className={style.menuList}>
            <FaFileInvoiceDollar className={style.asideMenuIcon} />
            <span
              className={style.asideMenuText}
              onClick={() => fetchCatagoryNews("business")}
            >
              Business
            </span>
          </li>
          <li className={style.menuList}>
            <FaHandHoldingMedical className={style.asideMenuIcon} />
            <span
              className={style.asideMenuText}
              onClick={() => fetchCatagoryNews("health")}
            >
              Health
            </span>
          </li>
          <li className={style.menuList}>
            <FaFilm className={style.asideMenuIcon} />
            <span
              className={style.asideMenuText}
              onClick={() => fetchCatagoryNews("entertainment")}
            >
              Entertainment
            </span>
          </li>
          <li className={style.menuList}>
            <FaReact className={style.asideMenuIcon} />
            <span
              className={style.asideMenuText}
              onClick={() => fetchCatagoryNews("science")}
            >
              Science
            </span>
          </li>
          <li className={style.menuList}>
            <TbShirtSport className={style.asideMenuIcon} />
            <span
              className={style.asideMenuText}
              onClick={() => fetchCatagoryNews("sports")}
            >
              Sports
            </span>
          </li>
          <li className={style.menuList}>
            <MdSettingsInputAntenna className={style.asideMenuIcon} />
            <span
              className={style.asideMenuText}
              onClick={() => fetchCatagoryNews("technology")}
            >
              Technology
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
