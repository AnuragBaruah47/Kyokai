import { useForm } from "react-hook-form";
import { logIn } from "../lib/Functions";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useUserStore } from "../Store/UserStore";
import Loader from "../Components/Loader";

export default function SignIn() {
  const [loader, setLoader] = React.useState(false);
  const user = useUserStore((state) => state.user);
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
    useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (data) => {
    setLoader(true);
    await logIn(data);
    setLoader(false);
    navigate("/");
      window.location.reload();
  };




    if (loader) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form
        className="h-85 gap-3 flex font-semibold justify-center items-center flex-col w-90  rounded-md border-2 shadow-[5px_5px_0_#000] bg-white"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="font-semibold w-full flex items-center flex-col h-15">
          <input
            className="p-2 w-60 border-2 rounded-md"
            placeholder="Enter Your Email"
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

        <div className="font-semibold w-full flex items-center flex-col h-15">
          <input
            placeholder="Enter Your Password"
            className="p-2 border-2 w-60 rounded-md"
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

        <div className="h-15 w-full flex justify-center">
          <button
            className="border-2 shadow-[5px_5px_0_#000] h-10 active:shadow-none w-40 rounded-md"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
      <div className="translate-y-5 font-semibold">
        Dont have an account?
        <button
          onClick={() => navigate("/signup")}
          className="cursor-pointer font-extrabold ml-1"
        >
          Create One
        </button>
      </div>
    </div>
  );
}
