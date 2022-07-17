import React, { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
// import About from "./pages/About";
// import Home from "./pages/Home";

const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/Home"));
const About = lazy(() =>
  import(/* webpackChunkName: 'about' */ "./pages/About")
);

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <Home />
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Suspense>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}
