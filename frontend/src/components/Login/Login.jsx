import React from "react";
import style from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className={style.loginFormWrapper}>
      <div className={style.heading}>
        <span className={style.bigHeading}>Sign in</span>
        <span className={style.smallHeading}>Connect with your friends</span>
      </div>
      <div className={style.inputFeildWrapper}>
        <form>
          <input type="text" className={style.inputFeild} placeholder="Email" />
          <hr />
          <input
            type="text"
            className={style.inputFeild}
            placeholder="Password"
          />
          <hr />
          <button className={style.formSubmitButton}>Sign In</button>
          <button className={style.formSubmitButton}>Sign In As Guest</button>
          <button className={style.googleButton}>
            <FcGoogle className={style.googleSymbol} />{" "}
            <span>Continue with Google</span>
          </button>
        </form>
        <div className={style.registUserRedirect}>
          <span>Don't have account </span>&nbsp;
          <Link to="/register">Click here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
