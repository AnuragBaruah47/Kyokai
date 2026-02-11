import { useForm } from "react-hook-form";
import { account, logOut, signUp } from "../lib/Functions";
import { useNavigate } from "react-router-dom";
import CheckLoader from "../Components/Tick";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [loader, setLoader] = useState(false);
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoader(true);
    await signUp(data);
    setLoader(false);
    navigate("/");
  };

  useEffect(()=>{
 if (user) {
    navigate("/");
  }
  },[user])
 

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label htmlFor="userName">Username</label>

          <input
            id="userName"
            type="text"
            autoComplete="username"
            {...register("userName", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
          />

          {errors.userName && (
            <p className="error">{errors.userName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          submit
        </button>
      </form>
      <div>
        already have an account{" "}
        <button onClick={() => navigate("/signin")} className="cursor-pointer">
          sign in
        </button>
      </div>
    </div>
  );
}
