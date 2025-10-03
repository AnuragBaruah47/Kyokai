import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/Home";
import AllAnime from "./Pages/AllAnime";
import EachAnime from "./Pages/EachAnime";
import Bookmarks from "./Pages/Bookmarks";
import Error404 from "./Pages/Error404";
import SearchPage from "./Pages/SearchPage";
import UpcomingAnime from "./Pages/UpcomingAnime";
import Reviews from "./Pages/Reviews";
import ViewAllCharacter from "./Pages/ViewAllCharacter";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="anime" element={<AllAnime />} />
        <Route path="anime/:id" element={<EachAnime />} />
        <Route path="upcoming" element={<UpcomingAnime/>} />
        <Route path="bookmarks" element={<Bookmarks/>} />
        <Route path="searchpage" element={<SearchPage/>} />
        <Route path="reviews/:id" element={<Reviews/>} />
        <Route path="viewallchar/:id" element={<ViewAllCharacter/>} />
        <Route path="*" element={<Error404/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  );
}

export default App;
