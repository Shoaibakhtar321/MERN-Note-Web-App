import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import NoteCard from "../components/NoteCard";
import { getAllNotes } from '../redux/features/getAllNotesSlice'
import { useDispatch, useSelector } from 'react-redux'

import axios from "axios";

const AllNotes = () => {

  const [colorCode, setColorCode] = useState()
  const dispatch = useDispatch()
  const { notes, loading, error } = useSelector((state) => state.allNotes)

  useEffect(() => {
    dispatch(getAllNotes())
  }, [dispatch])

  if (loading) return <h2>Loading....</h2>
  if (error) return <h2>Error: {error}</h2>;
  return (
    <div className="h-full text-text">
      <div>
        <PageTitle title={"All Notes"} count={`Total Notes: ${notes.length}`} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {notes.length === 0 ? (<p>No notes found.</p>) : (
          notes.map((note, idx) => (
            <NoteCard data={note} key={note._id} index={idx} id={note._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllNotes;
