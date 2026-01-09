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
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="anime" element={<AllAnime />} />
        <Route path="anime/:id" element={<EachAnime />} />
        <Route path="search" element={<SearchComponent/>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
