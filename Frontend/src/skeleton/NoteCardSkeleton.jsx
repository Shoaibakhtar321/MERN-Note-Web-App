import React from "react";

const NoteCardSkeleton = () => {
  return (
    <article className="flex min-h-[220px] animate-pulse flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-neutral-100 p-5 shadow-sm">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* Title */}
          <div className="h-6 w-32 rounded-md bg-neutral-200" />

          {/* Pin + Menu */}
          <div className="flex shrink-0 items-center gap-1">
            <div className="h-8 w-8 rounded-lg bg-neutral-200" />
            <div className="h-8 w-8 rounded-lg bg-neutral-200" />
          </div>
        </div>

        {/* Description */}
        <div className="mt-5 space-y-2">
          <div className="h-4 w-full rounded-md bg-neutral-200" />
          <div className="h-4 w-[92%] rounded-md bg-neutral-200" />
          <div className="h-4 w-[76%] rounded-md bg-neutral-200" />
          <div className="h-4 w-[58%] rounded-md bg-neutral-200" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
        {/* Date */}
        <div className="h-3.5 w-28 rounded-md bg-neutral-200" />

        {/* Copy */}
        <div className="h-8 w-14 rounded-lg bg-neutral-200" />
      </div>
    </article>
  );
};

export default NoteCardSkeleton;
