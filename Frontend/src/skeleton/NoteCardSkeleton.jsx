import React from "react";

const NoteCardSkeleton = () => {
  return (
    <div className="p-4 rounded-2xl flex flex-col justify-between bg-neutral-100 animate-pulse">
      {/* Top section */}
      <div className="flex flex-col justify-between items-start gap-1">
        <div className="flex w-full justify-between">
          {/* Title */}
          <div className="h-6 w-28 rounded bg-neutral-200" />

          {/* Pin + menu */}
          <div className="flex gap-3 items-center">
            <div className="h-[18px] w-[18px] rounded bg-neutral-200" />
            <div className="h-5 w-2 rounded bg-neutral-200" />
          </div>
        </div>

        {/* Description */}
        <div className="py-3 w-full space-y-2">
          <div className="h-4 w-[90%] rounded bg-neutral-200" />
          <div className="h-4 w-[70%] rounded bg-neutral-200" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex justify-between items-center pt-2 border-t-2 border-neutral-200">
        <div className="h-4 w-32 rounded bg-neutral-200" />
        <div className="h-5 w-5 rounded bg-neutral-200" />
      </div>
    </div>
  );
};

export default NoteCardSkeleton;
