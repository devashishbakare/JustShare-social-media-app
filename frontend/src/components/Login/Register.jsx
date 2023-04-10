import React from "react";
import style from "./login.module.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className={style.loginFormWrapper}>
      <div className={style.heading}>
        <span className={style.bigHeading}>Sign Up</span>
        <span className={style.smallHeading}>
          Register to connect with your friends
        </span>
      </div>
      <div className={style.inputFeildWrapper}>
        <form>
          <input
            type="text"
            className={style.inputFeild}
            placeholder="UserName"
          />
          <hr />
          <input type="text" className={style.inputFeild} placeholder="Email" />
          <hr />
          <input
            type="text"
            className={style.inputFeild}
            placeholder="Password"
          />
          <hr />
          <input
            type="text"
            className={style.inputFeild}
            placeholder="Confirm Password"
          />
          <hr />
          <button className={style.formSubmitButton}>Sign Up</button>
        </form>
        <div className={style.registUserRedirect}>
          <span>Click to Sign in</span>&nbsp;
          <Link to="/">here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
