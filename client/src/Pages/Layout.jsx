import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "../Components/LeftBar";
import Navbar from "../Components/Navbar";
import RightBar from "../Components/RightBar";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex m-3 mt-20 justify-center">
        <div className="hidden md:block w-1/5 ">
          <LeftBar />
        </div>
        <div className=" md:w-3/5 ">
          <Outlet />
        </div>
        <div className="hidden  md:block  w-1/5">
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default Layout;
