import React from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

const Error = ({ onRetry, err }) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Error Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10 text-danger">
          <MdErrorOutline size={34} />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-2xl font-semibold text-text-primary">
          {err ? err : "Something went wrong"}
        </h1>

        {/* Description */}
        <p className="mt-2 leading-relaxed text-text-secondary">
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
            rounded-xl
            bg-primary
            px-5
            py-2.5
            font-medium
            text-white
            transition
            hover:bg-primary-hover
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
