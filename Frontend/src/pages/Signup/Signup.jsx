import axios from "axios";
import React from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const alert = useAlert();

  // const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, errors } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("data: ", data);
    const userdata = {
      name: data?.name,
      email: data?.email.toLowerCase(),
      password: data?.password,
    };

    await axios
      .post("/api/users/register", userdata)
      .then((res) => {
        alert.success("Successfully logged in");
        const token = res.data.token;
        localStorage.setItem("token", token);

        navigate("/");
      })
      .catch((error) => {
        alert.error("Something went wrong");
      });
  };

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="login-form">
              <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="name"
                  className="form-control"
                  {...register("name", {
                    required: "Name Address is required",
                  })}
                  placeholder="Your name"
                />
              </div>
              {errors?.name && <p className="error">{errors.name?.message}</p>}

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
                  className="form-control mb-3"
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
                  <Link to="/signin">Sign in</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
