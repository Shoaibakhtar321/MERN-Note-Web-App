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
      border border-border-light
      bg-surface/85
      p-1
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      backdrop-blur-2xl
    "
    >
      {/* Inner glass surface */}
      <div className="rounded-xl bg-surface/60 p-4 sm:p-5">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MdAdd className="text-xl" />
              </div>

              <div>
                <h2 className="text-base font-semibold tracking-tight text-text-primary">
                  Create Note
                </h2>

                <p className="mt-0.5 text-xs text-text-muted">
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
            flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center
            rounded-lg
            text-text-muted
            transition-all duration-200
            hover:bg-surface-secondary
            hover:text-danger
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
                className="text-xs font-semibold text-text-secondary"
              >
                Title
              </label>

              <span
                className={`text-[11px] font-medium ${
                  titleError
                    ? "text-danger"
                    : title.length > titleLimit - 5
                      ? "text-warning"
                      : "text-text-muted"
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
              bg-surface-secondary/80
              px-3.5 py-3
              text-sm text-text-primary
              outline-none
              transition-all duration-200
              placeholder:text-text-muted
              ${
                titleError
                  ? "border-danger bg-danger/10 focus:border-danger focus:ring-4 focus:ring-danger/5"
                  : "border-border focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/5"
              }
            `}
            />

            {titleError && (
              <p className="mt-1.5 text-[11px] font-medium text-danger">
                Title cannot exceed {titleLimit} characters.
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="note-description"
                className="text-xs font-semibold text-text-secondary"
              >
                Description
              </label>

              <span
                className={`text-[11px] font-medium ${
                  descriptionError
                    ? "text-danger"
                    : description.length > descriptionLimit - 20
                      ? "text-warning"
                      : "text-text-muted"
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
              bg-surface-secondary/80
              px-3.5 py-3
              text-sm leading-6 text-text-primary
              outline-none
              transition-all duration-200
              placeholder:text-text-muted
              ${
                descriptionError
                  ? "border-danger bg-danger/10 focus:border-danger focus:ring-4 focus:ring-danger/5"
                  : "border-border focus:border-primary/30 focus:bg-surface focus:ring-4 focus:ring-primary/5"
              }
            `}
            />

            {descriptionError && (
              <p className="mt-1.5 text-[11px] font-medium text-danger">
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
              flex-1 rounded-xl border border-border
              bg-surface
              px-4 py-2.5
              text-sm font-medium text-text-secondary
              transition-all duration-200
              hover:bg-surface-secondary
              hover:text-text-primary
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
