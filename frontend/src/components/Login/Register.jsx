import React from "react";
import style from "./login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../constants";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(`${baseUrl}/register`, formData, config);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    console.log("Form Data", formData);
  };

  //uploading images on cloud and save it in db
  const pictureUpload = async (picture) => {
    try {
      if (
        picture.type === "image/jpeg" ||
        picture.type === "image/jpg" ||
        picture.type === "image/png"
      ) {
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "Social Media App");
        data.append("cloud_name", "djgouef8q");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/djgouef8q/upload",
          {
            method: "post",
            body: data,
          }
        );
        const uploadedImageUrl = await response.json();
        setFormData({
          ...formData,
          profilePicture: uploadedImageUrl.url.toString(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.loginFormWrapper}>
      <div className={style.heading}>
        <span className={style.bigHeading}>Sign Up</span>
        <span className={style.smallHeading}>
          Register to connect with your friends
        </span>
      </div>
      <div className={style.inputFeildWrapper}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            className={style.inputFeild}
            placeholder="UserName"
            value={formData.userName}
            onChange={handleChange}
          />
          <hr />
          <input
            type="text"
            className={style.inputFeild}
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <hr />
          <input
            type="password"
            name="password"
            className={style.inputFeild}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <hr />
          <input
            type="password"
            name="confirmPassword"
            className={style.inputFeild}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <hr />
          <div className={style.uploadfileWrapper}>
            <label>Upload profile photo</label>
            <input
              type="file"
              name="profilePicture"
              onChange={(e) => pictureUpload(e.target.files[0])}
            />
          </div>

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
