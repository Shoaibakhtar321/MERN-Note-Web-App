import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PageTitle from '../components/PageTitle'
import NoteCard from '../components/NoteCard'
import { PiNote } from 'react-icons/pi'

const Pinned = () => {

  const [pinnedNotes, setPinnedNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const fetchPinnedNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/notes/pinned");
      setPinnedNotes(data.data); 
    } finally {
      setLoading(false);
    }
  };

  fetchPinnedNotes();
}, []);

  if (loading) return <h2>Loading....</h2>

  return (
    <div>
      <div>
        <PageTitle title={'Pinned'} count={'Count'} />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {

          pinnedNotes.map((pinned) => (
            console.log(pinned),
            <NoteCard data={pinned} key={pinned._id} id={pinned._id} />
          ))
        }
      </div>
    </div>
  )
}

export default Pinned