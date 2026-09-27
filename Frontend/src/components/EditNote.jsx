import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdCheck, MdClose } from "react-icons/md";
import { update_note } from "../redux/features/getAllNotesSlice";

const EditNote = ({ onClose, data }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");
  const [isSaving, setIsSaving] = useState(false);

  const titleLimit = 20;
  const descriptionLimit = 150;

  const titleError = title.length > titleLimit;
  const descriptionError = description.length > descriptionLimit;
  const hasError = titleError || descriptionError;

  useEffect(() => {
    setTitle(data.title || "");
    setDescription(data.description || "");
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (hasError || !title.trim()) return;

    setIsSaving(true);

    try {
      await dispatch(
        update_note({
          id: data._id,
          title: title.trim(),
          description: description.trim(),
        }),
      ).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
      <div className="flex items-start justify-between border-b border-border px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
            Edit Note
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Make changes to your note and save them when you're done.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close edit note"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-secondary hover:text-text-secondary cursor-pointer"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-5 p-5 sm:p-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="edit-note-title"
              className="text-sm font-medium text-text-secondary"
            >
              Title
            </label>

            <span
              className={`text-xs ${
                titleError ? "font-medium text-danger" : "text-text-muted"
              }`}
            >
              {title.length}/{titleLimit}
            </span>
          </div>

          <input
            id="edit-note-title"
            type="text"
            value={title}
            maxLength={titleLimit + 1}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            autoFocus
            className={`w-full rounded-xl border bg-surface-secondary px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted ${
              titleError
                ? "border-danger bg-danger/10 focus:border-danger"
                : "border-border focus:border-primary/40 focus:bg-surface focus:ring-4 focus:ring-primary/5"
            }`}
          />

          {titleError && (
            <p className="mt-1.5 text-xs text-danger">
              Title cannot be longer than {titleLimit} characters.
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="edit-note-description"
              className="text-sm font-medium text-text-secondary"
            >
              Description
            </label>

            <span
              className={`text-xs ${
                descriptionError ? "font-medium text-danger" : "text-text-muted"
              }`}
            >
              {description.length}/{descriptionLimit}
            </span>
          </div>

          <textarea
            id="edit-note-description"
            value={description}
            maxLength={descriptionLimit + 1}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something about your note..."
            rows={7}
            className={`w-full resize-none rounded-xl border bg-surface-secondary px-4 py-3 text-sm leading-6 text-text-primary outline-none transition-all placeholder:text-text-muted ${
              descriptionError
                ? "border-danger bg-danger/10 focus:border-danger"
                : "border-border focus:border-primary/40 focus:bg-surface focus:ring-4 focus:ring-primary/5"
            }`}
          />

          {descriptionError && (
            <p className="mt-1.5 text-xs text-danger">
              Description cannot be longer than {descriptionLimit} characters.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-full rounded-xl px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={hasError || !title.trim() || isSaving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto cursor-pointer"
          >
            <MdCheck className="text-lg" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
