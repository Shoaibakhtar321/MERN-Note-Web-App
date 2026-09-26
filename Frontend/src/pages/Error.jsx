import React from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

const Error = ({ onRetry, err }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="flex flex-col items-center text-center max-w-md">
        {/* Error Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500">
          <MdErrorOutline size={34} />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-semibold text-text">
          {err ? err : "Something went wrong"}
        </h1>

        {/* Description */}
        <p className="mt-2 text-text/60 leading-relaxed">
          {err
            ? "We couldn't find your notes right now."
            : "We couldn't load your notes right now. Please try again in a moment."}
        </p>

        {/* Retry Button */}
        {!err && (
          <button
            type="button"
            onClick={onRetry}
            className="
            mt-6
            inline-flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-xl
            bg-primary
            text-white
            font-medium
            transition
            hover:opacity-90
            active:scale-95
          "
          >
            <IoRefreshOutline size={19} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
