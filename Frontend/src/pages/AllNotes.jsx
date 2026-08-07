import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import NoteCard from "../components/NoteCard";

import axios from "axios";

const AllNotes = () => {

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [colorCode, setColorCode] = useState()
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notes')

        setNotes(response.data.notes)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  



  if (loading) return <h2>Loading....</h2>
  return (
    <div className="h-full text-text">
      <div>
        <PageTitle title={"All Notes"} count={"Count"} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {notes.map((note, idx) => (
          <NoteCard data={note} key={note._id} index={idx} id={note._id} />
        ))}
      </div>
    </div>
  );
};

export default AllNotes;
