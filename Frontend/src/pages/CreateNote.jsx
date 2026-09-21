import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_note } from "../redux/features/getAllNotesSlice";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { createLoading } = useSelector((state) => state.notesReducer);
  
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!title.trim() || !description.trim()) {
        return;
      }

      dispatch(create_note({ title, description }));
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  }
  const isDisabled = !title.trim() || !description.trim();
  return (
    <div className="min-w-md bg-white/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.15)] min-h-60 rounded-2xl p-3 flex flex-col ">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Note title"
          className="w-full px-3 py-2 rounded-xl border border-border outline-none resize-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          placeholder="Enter note details"
          className="w-full h-32 px-3 py-2 rounded-xl border border-border outline-none resize-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          disabled={isDisabled}
          type="submit"
          className="bg-primary py-3 rounded-2xl text-white font-medium active:scale-99 hover:cursor-pointer"
        >
          {createLoading ? 'Creating Note...' : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
