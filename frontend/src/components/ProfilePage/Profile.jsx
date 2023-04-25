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
  const [bookmarks, setBookMarks] = useState([]);
  const [isBookmarkClick, setIsBookmarkClick] = useState(false);
  const [news, setNews] = useState([]);
  const [isNewsClick, setIsNewsClick] = useState(false);
  const [isCategoryClick, setIsCategoryClick] = useState(false);
  return (
    <>
      <div className={style.profilePageContainer}>
        <div className={style.navBar}>
          <NavBar />
        </div>
        <div className={style.profileContainer}>
          <div className={style.profileAside}>
            <ContentContext.Provider
              value={{
                bookmarks,
                setBookMarks,
                isBookmarkClick,
                setIsBookmarkClick,
                news,
                setNews,
                isNewsClick,
                setIsNewsClick,
                setIsCategoryClick,
              }}
            >
              <Aside />
            </ContentContext.Provider>
          </div>
          <div className={style.profileContent}>
            <div className={style.profileDetailsContainer}></div>
            <div className={style.feedAndFriendWrapper}>
              <div className={style.profileFeedContainer}></div>
              <div className={style.friendsContainer}>
                <div className={friendCss.friendheadingWrapper}>
                  <span className={friendCss.relatedFriendText}>Friends</span>
                </div>
                <div className={style.friendListWrapper}>
                  <div className={friendCss.friendList}>
                    <img
                      src={f1}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>John Doe</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f2}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>Chris rollen</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f3}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>Moda wesber</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f1}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>John Doe</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f2}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>Chris rollen</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f3}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>Moda wesber</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f1}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>John Doe</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f2}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>Chris rollen</span>
                  </div>
                  <div className={friendCss.friendList}>
                    <img
                      src={f3}
                      alt="friends_Img"
                      className={friendCss.friendImg}
                    />
                    <span className={friendCss.friendName}>Moda wesber</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Profile;
