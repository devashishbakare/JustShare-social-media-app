import React from "react";
import style from "./login.module.css";
import loginImg from "../../assets/social.jpeg";
import Register from "./Register";

const ResisterPage = () => {
  return (
    <>
      <div className={style.loginContainer}>
        <div className={style.outerLoginBox}>
          <div className={style.loginBoxWrapper}>
            <div className={style.loginBoxImage}>
              <img
                className={style.loginImage}
                src={loginImg}
                alt="Login Page image"
              />
            </div>
            <div className={style.loginForm}>
              <Register />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResisterPage;
