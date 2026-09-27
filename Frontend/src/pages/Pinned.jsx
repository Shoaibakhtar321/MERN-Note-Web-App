import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../components/PageTitle";
import NoteCard from "../components/NoteCard";
import { PiNote } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { get_pinned_notes } from "../redux/features/getAllNotesSlice";
import { SearchContext } from "../context/Provider";
import NoteCardSkeleton from "../skeleton/NoteCardSkeleton";
import Error from "./Error";

const Pinned = () => {
  const dispatch = useDispatch();
  const { search, setSearch } = useContext(SearchContext);
  const { pinnedNotes, loading, error, notes } = useSelector(
    (state) => state.notesReducer,
  );
  const displayPinnedNotes = search.trim()
    ? pinnedNotes.filter((note) => notes.some((det) => note._id === det._id))
    : pinnedNotes;

  useEffect(() => {
    dispatch(get_pinned_notes());
    setSearch("");
  }, [dispatch]);

  function onRetry() {
    dispatch(get_pinned_notes());
  }

  if (loading)
    return (
      <div className="mt-25 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <NoteCardSkeleton key={idx} />
        ))}
      </div>
    );
  if (error) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Error err={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div>
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageTitle
          title={"Pinned"}
          count={`Total Pinned Notes: ${displayPinnedNotes.length}`}
        />
      </header>
      {displayPinnedNotes.length === 0 ? (
        <Error
          err={error ? error : "No pinned notes found"}
          onRetry={onRetry}
        />
      ) : 
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {displayPinnedNotes.map((pinned) => (
            <NoteCard data={pinned} key={pinned._id} id={pinned._id} />
          ))}
        </div>
      }
    </div>
  );
};

export default Pinned;
