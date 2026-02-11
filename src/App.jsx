import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "./Pages/Home";
import AllAnime from "./Pages/AllAnime";
import EachAnime from "./Pages/EachAnime";
import SearchComponent from "./Components/SearchComponent";
import Bookmarks from "./Pages/Bookmarks";
import AllSearchPage from "./Pages/AllSearchPage";
import SignUp from "./Pages/signup";
import SignIn from "./Pages/Signin";
import { useUserStore } from "./Store/UserStore";
import ProtectedRoute from "./Components/ProtectedRoutes";
const App = () => {
  const getSession = useUserStore((s) => s.getTheLoginUser);

  React.useEffect(() => {
    getSession();
  }, [getSession]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="anime" element={<AllAnime />} />
        <Route path="anime/:id" element={<EachAnime />} />
        <Route element={<ProtectedRoute />}>
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="viewall" element={<AllSearchPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
