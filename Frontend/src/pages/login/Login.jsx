import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const alert = useAlert();

  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("data: ", data);
    const userdata = {
      email: data?.email.toLowerCase(),
      password: data?.password,
    };

    await axios
      .post("/api/users/login", userdata)
      .then((res) => {
        const token = res.data.token;
        const user = res.data.user;
        const strnUser = JSON.stringify({ user });
        // console.log("strng: ", strnUser);

        // store token and user in local storage
        localStorage.setItem("user", strnUser);
        localStorage.setItem("token", token);

        navigate("/");
        alert.success("You are successfully logged in");
      })
      .catch((error) => {
        alert.error("Invalid email or password");
        // setErrorMessage(error);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="login-form">
              <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  placeholder="Your Email"
                />
              </div>
              {errors?.email && (
                <p className="error">{errors.email?.message}</p>
              )}

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password", {
                    required: "Email Address is required",
                  })}
                  name="password"
                  autoComplete="current-password"
                  required=""
                  placeholder="Your Password"
                />
                {errors?.password && (
                  <p className="error">{errors.password?.message}</p>
                )}

                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
                <p className="forgot-password text-right">
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
