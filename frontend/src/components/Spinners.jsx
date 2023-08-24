import React from "react";
import { ScaleLoader } from "react-spinners";
import style from "./spinners.css";
const Spinners = () => {
  return (
    <div className={style.spinnerStyle}>
      <ScaleLoader color={"#123abc"} loading={true} />
    </div>
  );
};

export default Spinners;
