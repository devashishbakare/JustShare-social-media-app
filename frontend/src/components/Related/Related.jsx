import React from "react";
import adImg from "../../assets/ad/ad3.jpg";
import f1 from "../../assets/user/img4.jpeg";
import f2 from "../../assets/user/img5.jpeg";
import f3 from "../../assets/user/img6.jpeg";
import style from "./related.module.css";
const Related = () => {
  return (
    <>
      <div className={style.relatedAddWrapper}>
        <div className={style.imgWrapper}>
          <img src={adImg} alt="related_ads" className={style.relatedAdImg} />
        </div>

        <a href="" className={style.relatedAdLink}>
          Visit Product
        </a>
      </div>
      <hr />
      <div className={style.relatedFriendWrapper}>
        <div className={style.friendheadingWrapper}>
          <span className={style.relatedFriendText}>Friends</span>
        </div>
        <div className={style.friendListWrapper}>
          <div className={style.friendList}>
            <img src={f1} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>John Doe</span>
          </div>
          <div className={style.friendList}>
            <img src={f2} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>Chris rollen</span>
          </div>
          <div className={style.friendList}>
            <img src={f3} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>Moda wesber</span>
          </div>
          <div className={style.friendList}>
            <img src={f1} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>John Doe</span>
          </div>
          <div className={style.friendList}>
            <img src={f2} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>Chris rollen</span>
          </div>
          <div className={style.friendList}>
            <img src={f3} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>Moda wesber</span>
          </div>
          <div className={style.friendList}>
            <img src={f1} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>John Doe</span>
          </div>
          <div className={style.friendList}>
            <img src={f2} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>Chris rollen</span>
          </div>
          <div className={style.friendList}>
            <img src={f3} alt="friends_Img" className={style.friendImg} />
            <span className={style.friendName}>Moda wesber</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Related;
