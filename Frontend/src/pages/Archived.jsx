import React, { useContext, useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { get_archived_notes } from "../redux/features/getAllNotesSlice";
import NoteCard from "../components/NoteCard";
import { SearchContext } from "../context/Provider";
import NoteCardSkeleton from "../skeleton/NoteCardSkeleton";
import Error from "./Error";

const Archived = () => {
  const dispatch = useDispatch();
  const { search, setSearch } = useContext(SearchContext);
  const { archivedNotes, loading, error, notes } = useSelector(
    (state) => state.notesReducer,
  );

  useEffect(() => {
    dispatch(get_archived_notes());
    setSearch("");
  }, [dispatch]);

  const displayArchivedNotes = search.trim()
    ? archivedNotes.filter((note) => notes.some((det) => note._id === det._id))
    : archivedNotes;

  function onRetry() {
    dispatch(get_pinned_notes());
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
  return (
    <div>
      <div>
        <PageTitle
          title={"Archived"}
          count={`Total Archived Notes: ${displayArchivedNotes.length}`}
        />
      </div>
      {displayArchivedNotes.length === 0 ? (
        <Error err={error ? error : "No archived notes found."} onRetry={onRetry} />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {displayArchivedNotes.map((pinned) => (
            <NoteCard data={pinned} key={pinned._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Archived;
