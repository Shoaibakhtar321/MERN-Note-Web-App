import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import NoteCard from "../components/NoteCard";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import CreateNote from "./CreateNote";
import { get_notes } from "../redux/features/getAllNotesSlice";

const AllNotes = () => {
  const dispatch = useDispatch();
  const [showCreateNote, setShowCreateNote] = useState(false);

  const { notes, loading, error, } = useSelector((state) => state.notesReducer);

  const noteRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        setShowCreateNote(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(get_notes());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="h-full text-text">
      <div className="flex justify-between items-center">
        <PageTitle title={"All Notes"} count={`Total Notes: ${notes.length}`} />
        <div className="relative">
          <button onClick={() => setShowCreateNote((prev) => !prev)}>
            <MdAdd
              size={50}
              className="p-1 bg-primary text-white rounded-full text-center hover:cursor-pointer active:scale-95"
            />
          </button>
          {showCreateNote && (
            <div className="absolute right-5 top-full z-50">
              <CreateNote />
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note, idx) => (
            <NoteCard data={note} key={note._id} index={idx} id={note._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllNotes;
