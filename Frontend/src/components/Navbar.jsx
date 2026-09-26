import React, { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  get_archived_notes,
  get_notes,
  get_pinned_notes,
  search_note,
} from "../redux/features/getAllNotesSlice";
import { SearchContext } from "../context/Provider";
const Navbar = () => {
  const { search, setSearch } = useContext(SearchContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search.trim()) {
        dispatch(get_notes());
        return;
      }
      dispatch(search_note(search));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  return (
    <div className="w-full px-8 py-5 border-b-2 border-border shadow-sm flex justify-between items-center">
      <div className="flex gap-1 px-3 py-2 w-1/2 bg-border/50 items-center rounded-xl">
        <IoSearch className="text-2xl" />
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          type="text"
          placeholder="Search notes by title..."
          className="w-full px-3 focus:outline-none"
        />
      </div>
      <div className="p-1 text-3xl cursor-pointer">
        <IoMdNotificationsOutline />
      </div>
    </div>
  );
};

export default Navbar;
