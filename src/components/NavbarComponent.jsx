import React from "react";
import LogoImg from "../assets/logo.png";

const NavbarComponent = () => {
  return (
    <>
      <nav className="flex w-full justify-between items-center bg-green-100 shadow-md py-3 px-10">
        {/* logo */}
        <div className="flex gap-1 justify-center items-center cursor-pointer">
          <img src={LogoImg} alt="logo-image" className="h-5 w-8" />
          <p className="text-lg font-semibold text-green-600 hover:text-green-700 transition ease-in-out">
            ToDoSome
          </p>
        </div>

        {/* navmenu */}
        <div className="flex gap-6 justify-center items-center text-green-900 font-semibold">
          <a href="#" className="text-sm">
            My ToDo
          </a>
          <a
            href="#"
            className="bg-green-800 text-white text-sm py-2 px-6 rounded-md hover:bg-green-700 transition ease-in-out"
          >
            Login
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavbarComponent;
