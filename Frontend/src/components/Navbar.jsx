import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
const Navbar = () => {
  return (
    <div className="w-full px-8 py-5 border-b-2 border-border shadow-sm flex justify-between items-center">
      <div className="flex gap-1 px-3 py-2 w-1/2 bg-border/50 items-center rounded-xl">
        <IoSearch className="text-2xl" />
        <input type="text" placeholder="Search notes by title..." className="w-full px-3 focus:outline-none"/>
      </div>
      <div className="p-1 text-3xl cursor-pointer">
        <IoMdNotificationsOutline />
      </div> 
    </div>
  );
};

export default Navbar;
