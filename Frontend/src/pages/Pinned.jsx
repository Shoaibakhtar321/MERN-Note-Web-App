import React, { useEffect, useState } from "react";
import axios from "axios";
import PageTitle from "../components/PageTitle";
import NoteCard from "../components/NoteCard";
import { PiNote } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { get_pinned_notes } from "../redux/features/getAllNotesSlice";

const Pinned = () => {
  const dispatch = useDispatch();
  const { pinnedNotes, loading, error } = useSelector(
    (state) => state.notesReducer,
  );

  useEffect(() => {
    dispatch(get_pinned_notes());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <div>
        <PageTitle
          title={"Pinned"}
          count={`Total Pinned Notes: ${pinnedNotes.length}`}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {pinnedNotes.map((pinned) => (
          <NoteCard data={pinned} key={pinned._id} id={pinned._id} />
        ))}
      </div>
    </div>
  );
};

export default Pinned;
