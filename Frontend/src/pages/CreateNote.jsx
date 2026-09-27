import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdAdd, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { create_note } from "../redux/features/getAllNotesSlice";
import { ErrorContext } from "../context/Provider";

const CreateNote = ({ prop }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { UIError, setUIError } = useContext(ErrorContext);
  const { createLoading } = useSelector((state) => state.notesReducer);

  const dispatch = useDispatch();

  const titleLimit = 20;
  const descriptionLimit = 150;

  const titleError = title.length > titleLimit;
  const descriptionError = description.length > descriptionLimit;

  const isDisabled =
    !title.trim() ||
    !description.trim() ||
    titleError ||
    descriptionError ||
    UIError ||
    createLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDisabled) return;

    try {
      await dispatch(
        create_note({
          title: title.trim(),
          description: description.trim(),
        }),
      ).unwrap();

      setTitle("");
      setDescription("");
      setUIError(false);
      prop(false);
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  return (
    <div
      className="
        w-[calc(100vw-2rem)]
        max-w-[400px]
        overflow-hidden
        rounded-2xl
        border border-white/60
        bg-white/85
        p-1
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        backdrop-blur-2xl
      "
    >
      {/* Inner glass surface */}
      <div className="rounded-xl bg-white/60 p-4 sm:p-5">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MdAdd className="text-xl" />
              </div>

              <div>
                <h2 className="text-base font-semibold tracking-tight text-neutral-900">
                  Create Note
                </h2>

                <p className="mt-0.5 text-xs text-neutral-400">
                  Capture something worth remembering.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => prop(false)}
            aria-label="Close create note"
            className="
              flex h-8 w-8 shrink-0 items-center justify-center
              rounded-lg
              text-neutral-400
              transition-all duration-200
              hover:bg-neutral-100
              hover:text-red-500 cursor-pointer
              active:scale-95
            "
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="note-title"
                className="text-xs font-semibold text-neutral-700"
              >
                Title
              </label>

              <span
                className={`text-[11px] font-medium ${
                  titleError
                    ? "text-red-500"
                    : title.length > titleLimit - 5
                      ? "text-amber-500"
                      : "text-neutral-400"
                }`}
              >
                {title.length}/{titleLimit}
              </span>
            </div>

            <input
              id="note-title"
              type="text"
              value={title}
              placeholder="Give your note a title..."
              maxLength={titleLimit + 1}
              onChange={(e) => {
                const value = e.target.value;

                setTitle(value);
                setUIError(
                  value.length > titleLimit ||
                    description.length > descriptionLimit,
                );
              }}
              className={`
                w-full rounded-xl border
                bg-neutral-50/80
                px-3.5 py-3
                text-sm text-neutral-900
                outline-none
                transition-all duration-200
                placeholder:text-neutral-400
                ${
                  titleError
                    ? "border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
                    : "border-neutral-200 focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5"
                }
              `}
            />

            {titleError && (
              <p className="mt-1.5 text-[11px] font-medium text-red-500">
                Title cannot exceed {titleLimit} characters.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="note-description"
                className="text-xs font-semibold text-neutral-700"
              >
                Description
              </label>

              <span
                className={`text-[11px] font-medium ${
                  descriptionError
                    ? "text-red-500"
                    : description.length > descriptionLimit - 20
                      ? "text-amber-500"
                      : "text-neutral-400"
                }`}
              >
                {description.length}/{descriptionLimit}
              </span>
            </div>

            <textarea
              id="note-description"
              value={description}
              placeholder="Write your thoughts here..."
              maxLength={descriptionLimit + 1}
              rows={4}
              onChange={(e) => {
                const value = e.target.value;

                setDescription(value);
                setUIError(
                  title.length > titleLimit || value.length > descriptionLimit,
                );
              }}
              className={`
                w-full resize-none rounded-xl border
                bg-neutral-50/80
                px-3.5 py-3
                text-sm leading-6 text-neutral-900
                outline-none
                transition-all duration-200
                placeholder:text-neutral-400
                ${
                  descriptionError
                    ? "border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-4 focus:ring-red-500/5"
                    : "border-neutral-200 focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5"
                }
              `}
            />

            {descriptionError && (
              <p className="mt-1.5 text-[11px] font-medium text-red-500">
                Description cannot exceed {descriptionLimit} characters.
              </p>
            )}
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => prop(false)}
              disabled={createLoading}
              className="
                flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 transition-all duration-200
                hover:bg-neutral-50
                hover:text-neutral-900
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isDisabled}
              className="
                flex flex-1 items-center justify-center gap-2
                rounded-xl
                bg-primary
                px-4 py-2.5
                text-sm font-medium text-white
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-md
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
                disabled:hover:shadow-sm
              "
            >
              {createLoading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-base" />
                  Creating...
                </>
              ) : (
                <>
                  <MdAdd className="text-lg" />
                  Create Note
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
