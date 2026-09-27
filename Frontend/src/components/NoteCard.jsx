import { useEffect, useRef, useState } from "react";
import {
  BsFillPinAngleFill,
  BsPinAngle,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { VscUnpin } from "react-icons/vsc";
import { FaEdit, FaArchive, FaTrashAlt } from "react-icons/fa";
import { MdCheck } from "react-icons/md";
import { useDispatch } from "react-redux";

import {
  archive_note,
  delete_note,
  pin_note,
} from "../redux/features/getAllNotesSlice";

import EditNote from "./EditNote";

const colors = [
  "bg-note-1",
  "bg-note-2",
  "bg-note-3",
  "bg-note-4",
  "bg-note-5",
  "bg-note-6",
  "bg-note-7",
  "bg-note-8",
  "bg-note-9",
  "bg-note-10",
];

const NoteCard = ({ data }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [copied, setCopied] = useState(false);

  const menuRef = useRef(null);

  // Generate a consistent color based on the note ID.
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

  // Close menu when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePin = () => {
    dispatch(pin_note(data._id));
  };

  const handleArchive = () => {
    dispatch(archive_note(data._id));
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(delete_note(data._id));
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(false);
    setShowEdit(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${data.title}\n\n${data.description}`,
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy note:", error);
    }
  };

  return (
    <>
      <article
        className={`group flex min-h-[220px] flex-col justify-between rounded-2xl border border-border-light p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${backgroundColor}`}
      >
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3
              title={data.title}
              className="min-w-0 flex-1 break-words text-lg font-semibold leading-6 tracking-tight text-text-primary"
            >
              {data.title}
            </h3>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={handlePin}
                aria-label={data.isPinned ? "Unpin note" : "Pin note"}
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg active:scale-90 transition-all duration-200 ${
                  data.isPinned
                    ? "text-danger hover:bg-surface-secondary"
                    : "text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                {data.isPinned ? (
                  <BsFillPinAngleFill className="text-[17px]" />
                ) : (
                  <BsPinAngle className="text-[17px]" />
                )}
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  aria-label="Note options"
                  aria-expanded={open}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-secondary"
                >
                  <BsThreeDotsVertical className="text-lg" />
                </button>

                {open && (
                  <div className="absolute right-0 top-10 z-40 w-40 rounded-xl border border-border bg-surface py-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary"
                    >
                      <FaEdit className="text-sm" />
                      <span>Edit</span>
                    </button>

                    {/* Pin */}
                    <button
                      type="button"
                      onClick={() => {
                        handlePin();
                        setOpen(false);
                      }}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary"
                    >
                      {data.isPinned ? (
                        <VscUnpin className="text-base" />
                      ) : (
                        <BsFillPinAngleFill className="text-sm" />
                      )}

                      <span>{data.isPinned ? "Unpin" : "Pin"}</span>
                    </button>

                    {/* Archive */}
                    <button
                      type="button"
                      onClick={handleArchive}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary"
                    >
                      <FaArchive className="text-sm" />

                      <span>{data.isArchived ? "Unarchive" : "Archive"}</span>
                    </button>

                    <div className="my-1 border-t border-border-light" />

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-danger transition-colors hover:bg-danger/10"
                    >
                      <FaTrashAlt className="text-sm" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 line-clamp-5 text-sm leading-6 text-text-secondary">
            {data.description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex items-center justify-between border-t border-text-muted pt-4">
          <time className="text-xs font-medium text-text-secondary">
            {date}
          </time>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy note"
            className="group/copy flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-text-muted transition-all hover:bg-surface-secondary hover:text-text-primary active:scale-90 cursor-pointer"
          >
            {copied ? (
              <>
                <MdCheck className="text-base text-success" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <IoCopyOutline className="text-base" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </article>

      {/* Edit Modal */}
      {showEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-overlay px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowEdit(false);
            }
          }}
        >
          <EditNote data={data} onClose={() => setShowEdit(false)} />
        </div>
      )}
    </>
  );
};

export default NoteCard;
