import { useEffect, useRef, useState } from "react";
import { BsFillPinAngleFill, BsPinAngle } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { VscUnpin } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  archive_note,
  delete_note,
  pin_note,
} from "../redux/features/getAllNotesSlice";

const menuStyle =
  "w-full text-base px-4 py-2 flex gap-2 items-center text-left hover:bg-gray-100";

const colors = [
  "#F3F4F6", // Soft Gray
  "#FEF3C7", // Soft Amber
  "#DBEAFE", // Soft Blue
  "#DCFCE7", // Soft Green
  "#FCE7F3", // Soft Pink
  "#EDE9FE", // Soft Violet
  "#CCFBF1", // Soft Teal
  "#FFE4E6", // Soft Rose
  "#FFEDD5", // Soft Orange
  "#E0F2FE", // Soft Sky
];

const NoteCard = ({ data }) => {
  const colorIndex =
    [...String(data._id)].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    colors.length;

  const backgroundColor = colors[colorIndex];

  const date = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  });
  const [open, setOpen] = useState(false);

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

  const dispatch = useDispatch();

  return (
    <div
      className={`p-4 my-4 rounded-2xl flex flex-col justify-between`}
      style={{ backgroundColor }}
    >
      <div className="flex flex-col justify-between items-start gap-1">
        <div className=" flex w-full justify-between ">
          <div>
            <h3 className="text-xl font-medium">{data.title}</h3>
          </div>
          <div className="flex gap-3 items-center text-xl">
            {data.isPinned ? (
              <BsFillPinAngleFill
                size={18}
                className="cursor-pointer text-red-500 active:scale-85"
                onClick={() => dispatch(pin_note(data._id))}
              />
            ) : (
              <BsPinAngle
                size={18}
                className="cursor-pointer text-black active:scale-85"
                onClick={() => dispatch(pin_note(data._id))}
              />
            )}

            <div className="relative inline-block" ref={menuRef}>
              <BsThreeDotsVertical
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="absolute right-2 w-35 bg-background rounded-lg shadow-lg z-50 select-none cursor-pointer">
                  <div className={menuStyle}>
                    <FaEdit />
                    <span>Edit</span>
                  </div>
                  <div
                    className={menuStyle}
                    onClick={() => {
                      dispatch(pin_note(data._id));
                      setOpen(false);
                    }}
                  >
                    {data.isPinned ? (
                      <VscUnpin size={18} />
                    ) : (
                      <BsFillPinAngleFill />
                    )}
                    <span>{data.isPinned ? "Unpin" : "Pin"}</span>
                  </div>
                  <div
                    className={menuStyle}
                    onClick={() => dispatch(archive_note(data._id))}
                  >
                    <FaArchive />
                    <span>{data.isArchived ? "Unarchive" : "Archive"}</span>
                  </div>
                  <div
                    className={`${menuStyle} text-red-600/70`}
                    onClick={() => {
                      setOpen(false);
                      dispatch(delete_note(data._id));
                    }}
                  >
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
