import React, { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import NoteCard from "../components/NoteCard";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import CreateNote from "./CreateNote";
import { get_notes } from "../redux/features/getAllNotesSlice";
import NoteCardSkeleton from "../skeleton/NoteCardSkeleton";
import Error from "./Error";

const AllNotes = () => {
  const dispatch = useDispatch();
  const [showCreateNote, setShowCreateNote] = useState(false);
  const { notes, loading, error } = useSelector((state) => state.notesReducer);
  const noteRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setShowCreateNote(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(get_notes());
  }, [dispatch]);

  function onRetry() {
    dispatch(get_notes());
  }

  if (loading)
    return (
      <div className="pt-20 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <NoteCardSkeleton key={idx} />
        ))}
      </div>
    );
  if (error)
    return (
      <div className="pt-20">
        <Error err={error} onRetry={onRetry} />
      </div>
    );

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="h-full text-text">
      <div className="flex justify-between items-center">
        <PageTitle title={"All Notes"} count={`Total Notes: ${notes.length}`} />
        <div className="relative" ref={noteRef}>
          <button onClick={() => setShowCreateNote((prev) => !prev)}>
            <MdAdd
              size={50}
              className="p-1 bg-primary text-white rounded-full text-center hover:cursor-pointer active:scale-95"
            />
          </button>
          {showCreateNote && (
            <div className="absolute right-5 top-full z-50">
              <CreateNote prop={setShowCreateNote} />
            </div>
          )}
        </div>
      </div>

      {sortedNotes.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 text-center">
          <h2 className="text-xl font-semibold text-neutral-900">
            Create your first note
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Welcome to your notes gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {sortedNotes.map((note) => (
            <NoteCard data={note} key={note._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllNotes;
