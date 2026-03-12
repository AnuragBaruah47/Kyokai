import { useForm } from "react-hook-form";
import { account, logOut, signUp } from "../lib/Functions";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useUserStore } from "../Store/UserStore";

export default function SignUp() {
  const [loader, setLoader] = useState(false);
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

  const user = useUserStore((s)=>s.user)

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  if (loader) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const onSubmit = async (data) => {
    setLoader(true);
    await signUp(data);
    setLoader(false);

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen  w-screen justify-center items-center">
      <form
        className="h-100 gap-3 flex font-semibold justify-center items-center flex-col w-100 rounded-md border-2 shadow-[5px_5px_0_#000] bg-white"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="font-semibold w-full flex items-center flex-col h-15">
          <input
            placeholder="Enter Your Username"
            className="p-2 w-60 border-2 rounded-md"
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

        <div className="font-semibold w-full flex items-center flex-col h-15">
          <input
            placeholder="Enter Your Email"
            className="p-2 w-60 border-2 rounded-md"
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
            className="p-2 w-60 border-2 rounded-md"
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

        <button
          type="submit "
          className="border-2 shadow-[5px_5px_0_#000] h-10 active:shadow-none w-40 rounded-md"
          disabled={isSubmitting}
        >
          submit
        </button>
      </form>
      <div className="translate-y-8 font-semibold">
        Already have an account ?
        <button
          onClick={() => navigate("/signin")}
          className="cursor-pointer ml-1 font-extrabold "
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
