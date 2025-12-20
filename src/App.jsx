import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./assets/Pages/Home";
import RootLayout from "./RootLayout/RootLayout";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={router}/>;
};

export default App;
