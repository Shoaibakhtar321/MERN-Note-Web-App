import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { VscPinned } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCopyOutline, IoReturnUpBack } from "react-icons/io5";

import { FaEdit } from "react-icons/fa";
import { VscRepoPinned } from "react-icons/vsc";
import { FaArchive } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { deleteNote } from '../api/notesApi'
import { useDispatch } from "react-redux";

const menuStyle =
  "w-full text-base px-4 py-2 flex gap-2 items-center text-left hover:bg-gray-100";


const NoteCard = ({ data, index, id }) => {


  const date = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short"
  });
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(data.isPinned)

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const dispatch = useDispatch()

  return (
    <div
      className={`p-4 my-4 rounded-2xl flex flex-col justify-between bg-amber-50`}
    >
      <div className="flex flex-col justify-between items-start gap-1">
        <div className=" flex w-full justify-between ">
          <div>
            <h3 className="text-xl font-medium">{data.title}</h3>
          </div>
          <div className="flex gap-3 items-center text-xl">
            <VscPinned className={`cursor-pointer text-black`}
            />

            <div className="relative inline-block" ref={menuRef}>
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="absolute right-2 w-30 bg-background rounded-lg shadow-lg z-50 select-none cursor-pointer">
                  <div className={menuStyle}>
                    <FaEdit />
                    <span>Edit</span>
                  </div>
                  <div className={menuStyle} onClick={() => console.log(index)}>
                    <VscPinned />
                    <span>Pin</span>
                  </div>
                  <div className={menuStyle}>
                    <FaArchive />
                    <span>Archive</span>
                  </div>
                  <div className={`${menuStyle} text-red-600/70`} onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(data._id)
                    setOpen(false)
                    dispatch(getAllNotes())
                  }}>
                    <FaTrashAlt />
                    <span>Delete</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="py-3">
          <p>{data.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t-2 border-border  text-text/60">
        <p className="text-sm font-medium">{date}</p>
        <IoCopyOutline className="text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default NoteCard;
