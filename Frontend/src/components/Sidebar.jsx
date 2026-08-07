import React, { useState } from "react";
import axios from "axios";
import { GiNotebook } from "react-icons/gi";
import { LuNotebook } from "react-icons/lu";
import { VscRepoPinned } from "react-icons/vsc";
import { PiArchiveDuotone } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaArchive } from "react-icons/fa";
import { Link, Links, NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle =
    "flex gap-2 text-xl items-center px-5 py-3 rounded-2xl font-medium transition duration-150 ease-in";

  



  return (
    <aside className="h-full border-r-2 border-border px-3 py-4 shadow-lg ">
      <div className="flex gap-2 text-2xl items-center justify-center pb-10">
        <GiNotebook className="text-3xl  text-primary" />
        <h2 className="font-semibold">Notes App</h2>
      </div>

      <div className="space-y-3 border-b-2 border-border py-5 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-primary/80 text-background"}`
          }
        >
          <LuNotebook className="text-2xl" />
          <span>All Notes</span>
        </NavLink>
        <NavLink
          to="/pinned"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-primary/80 text-background"}`
          }

        >
          <VscRepoPinned className="text-2xl" />
          <span>Pinned</span>
        </NavLink>
        <NavLink
          to="/archived"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-primary/80 text-background"}`
          }
        >
          <FaArchive className="text-2xl" />
          <span>Archived</span>
        </NavLink>
        <NavLink
          to="/trash"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-primary/80 text-background"}`
          }
        >
          <FaTrashAlt className="text-2xl" />
          <span>Trash</span>
        </NavLink>
      </div>

      <div className="py-5">
        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `${linkStyle} ${isActive && "bg-primary/80 text-background"}`
          }
        >
          <IoSettings className="text-2xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
