import style from "./profile.module.css";
import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../Navbar/Navbar";
import Aside from "../Aside/Aside";
import { useState } from "react";
import ContentContext from "../../Contex/ContentContext";
import friendCss from "../Related/related.module.css";
//todo : we need replace this with real friend img
import f1 from "../../assets/user/img4.jpeg";
import f2 from "../../assets/user/img5.jpeg";
import f3 from "../../assets/user/img6.jpeg";

//
const Profile = () => {
  const location = useLocation();
  const userId = location.state;
  console.log("userId " + userId);
  return (
    <>
      <div className={style.profilePageContainer}>
        <div className={style.navBar}>
          <NavBar />
        </div>
        <div className={style.postContainer}>
          <div className={style.userInfoContainer}>
            <div className={style.userProfileImg}>
              {/* <img className={style.userImage} src={f1} alt="Profile Photo" /> */}
            </div>
            <div className={style.userFriendsDetails}></div>
            <div className={style.userOtherDetails}></div>
          </div>
          <div className={style.userPostContainer}>
            <div className={style.userPostInfoWrapper}>
              <div className={style.userPosts}></div>
              <div className={style.userFriends}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
