import React, { useContext, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { get_notes, search_note } from "../redux/features/getAllNotesSlice";
import { SearchContext } from "../context/Provider";

const Navbar = () => {
  const { search, setSearch } = useContext(SearchContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedSearch = search.trim();

      if (!trimmedSearch) {
        dispatch(get_notes());
        return;
      }

      dispatch(search_note(trimmedSearch));
    }, 500);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-center">
        {/* Search */}
        <div className="group flex w-full max-w-2xl items-center gap-2 rounded-xl border border-transparent bg-surface-secondary px-3 py-2.5 transition-all duration-200 focus-within:border-primary/30 focus-within:bg-surface focus-within:ring-4 focus-within:ring-primary/5">
          <IoSearch className="shrink-0 text-xl text-text-secondary transition-colors duration-200 group-focus-within:text-primary" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes by title..."
            aria-label="Search notes"
            className="min-w-0 flex-1 bg-transparent px-1 text-sm text-text-primary outline-none placeholder:text-text-muted"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-surface-secondary hover:text-text-secondary"
            >
              <MdClose className="text-lg" />
            </button>
          )}

          {!search && (
            <span className="hidden rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-muted sm:block">
              Search
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
