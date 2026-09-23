import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { get_archived_notes } from "../redux/features/getAllNotesSlice";
import NoteCard from "../components/NoteCard";

const Archived = () => {
  const { archivedNotes, loading, error } = useSelector(
    (state) => state.notesReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_archived_notes());
  }, [dispatch]);
  if (loading) return <h2>Loading....</h2>;
  return (
    <div>
      <div>
        <PageTitle
          title={"Archived"}
          count={`Total Archived Notes: ${archivedNotes.length}`}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {archivedNotes.map((pinned) => (
          <NoteCard data={pinned} key={pinned._id} />
        ))}
      </div>
    </div>
  );
};

export default Archived;
