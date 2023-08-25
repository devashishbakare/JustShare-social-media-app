import React from "react";
import { ClipLoader } from "react-spinners";
import style from "./spinners.css";
const Spinners = () => {
  return (
    <div className={style.spinnerStyle}>
      <ClipLoader color={"#123abc"} loading={true} />
    </div>
  );
};

export default Spinners;
