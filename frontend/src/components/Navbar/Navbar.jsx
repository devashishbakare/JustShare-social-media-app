import React, { useState } from "react";
import style from "./navbar.module.css";
import { FaSearch, FaRegBell, FaRocketchat } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../constants";
const Navbar = React.memo(() => {
  const userDetails = localStorage.getItem("user");
  const user = JSON.parse(userDetails);
  const userProfilePhoto = user.profilePicture;
  const navigate = useNavigate();

  const [searchQuery, setUserSearchQuery] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [displySearchResult, setDisplaySearchResult] = useState(false);

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(
          `${baseUrl}/user/searchUser?search=${searchQuery}`
        );
        //console.log(response.data);
        setSearchResult(response.data);
        console.log(searchResult);
        setDisplaySearchResult(true);
      } catch (err) {
        console.err(err, "error while fetching data for search");
      }
    }
  };
  return (
    <>
      <div className={style.navbarContainer}>
        <div className={style.navLeft}>
          <div className={style.navHeading} onClick={() => navigate("/home")}>
            Justshare
          </div>
        </div>

        <div className={style.navMiddle}>
          <div className={style.searchBar}>
            <FaSearch className={style.searchIcon} />
            <input
              className={style.seachInputFeild}
              placeholder="Search your friend .."
              onChange={(event) => setUserSearchQuery(event.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          {displySearchResult && (
            <div className={style.seachResultWrapper}>
              {searchResult.map((user) => (
                <span key={user._id} className={style.seachResultValue}>
                  {user.userName}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={style.navRight}>
          <div className={style.navRightText}>
            <span
              className={style.navRightButton}
              onClick={() => navigate("/home")}
            >
              HomePage
            </span>
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
});

export default Navbar;
