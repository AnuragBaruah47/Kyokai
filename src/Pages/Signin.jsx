import { useForm } from "react-hook-form";
import { logIn } from "../lib/Functions";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useUserStore } from "../Store/UserStore";

export default function SignIn() {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((s) => s.logOutTheUser);
  const getSession = useUserStore((s) => s.getTheLoginUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await logIn(data);
    navigate("/")
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
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <div>
        dont have an account?
        <button onClick={() => navigate("/signup")} className="cursor-pointer">
          create one
        </button>
      </div>
      {user && <button onClick={logOut}>Logout</button>}
    </div>
  );
}
