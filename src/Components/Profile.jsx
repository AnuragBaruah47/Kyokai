import React from "react";
import { useUserStore } from "../Store/UserStore";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  const [hover, setHover] = React.useState(false);
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((s) => s.logOutTheUser);
  const navigate = useNavigate();
  console.log(user);

  return (
    <div className="w-fit gap-5 flex justify-center items-center">
      {user && (
        <div
          onMouseLeave={() => setHover(false)}
          onMouseEnter={() => setHover(true)}
          className="flex items-center rounded-md p-1 cursor-pointer bg-white 
                 shadow-[5px_5px_0_#000] border-2 
                 transition-all duration-300 ease-in-out"
        >
          <FaRegUserCircle className="h-10 w-10" />

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out
        ${hover ? "max-w-xs opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}`}
          >
            <div className="text-xl font-semibold whitespace-nowrap">
              {user.name}
            </div>
          </div>
        </div>
      )}
      {user ? (
        <button onClick={()=>{
          logOut() 
          navigate("/")
        }} className="h-fit w-fit shadow-[5px_5px_0_#000] active:shadow-none rounded-md border-2 px-8 cursor-pointer py-3 font-bold bg-white">
          Logout
        </button>
      ) : (
        <button onClick={()=>navigate("/signin")} className="h-fit active:shadow-none w-fit shadow-[5px_5px_0_#000] rounded-md border-2 px-8 cursor-pointer py-3 font-bold bg-white">
          Signin
        </button>
      )}
    </div>
  );
};

export default Profile;
