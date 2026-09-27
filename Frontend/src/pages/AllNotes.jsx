import React, { useEffect, useMemo, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import NoteCard from "../components/NoteCard";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(get_notes());
  }, [dispatch]);

  const onRetry = () => {
    dispatch(get_notes());
  };

  const sortedNotes = useMemo(() => {
    return [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [notes]);

  if (loading) {
    return (
      <div className="mt-25 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <NoteCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Error err={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <main className="w-full text-text-primary">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle title="All Notes" count={`Total Notes: ${notes.length}`} />

        <div ref={noteRef} className="relative self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowCreateNote((prev) => !prev)}
            aria-label="Create a new note"
            aria-expanded={showCreateNote}
            className="group flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
          >
            <MdAdd className="text-xl transition-transform duration-200 group-hover:rotate-90" />
            <span>New Note</span>
          </button>

          {showCreateNote && (
            <div className="top-[calc(100%+10px)] z-50 w-[calc(100vw-2rem)] max-w-[380px] sm:w-[350px] md:absolute md:right-20">
              <CreateNote prop={setShowCreateNote} />
            </div>
          )}
        </div>
      </header>

      {/* Notes */}
      {sortedNotes.length === 0 ? (
        <EmptyNotes onCreate={() => setShowCreateNote(true)} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {sortedNotes.map((note) => (
            <NoteCard data={note} key={note._id} />
          ))}
        </div>
      )}
    </main>
  );
};

const EmptyNotes = ({ onCreate }) => {
  return (
    <section className="flex min-h-[360px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-secondary/70 px-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <LuPlus className="text-2xl" />
      </div>

      <h2 className="text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
        No notes yet
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-text-secondary">
        Start capturing your ideas, tasks, and thoughts by creating your first
        note.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
      >
        <MdAdd className="text-lg" />
        Create your first note
      </button>
    </section>
  );
};

export default AllNotes;
