import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GiNotebook } from "react-icons/gi";
import { LuNotebook, LuSettings } from "react-icons/lu";
import { VscRepoPinned } from "react-icons/vsc";
import { MdDarkMode } from "react-icons/md";
import { MdWbSunny } from "react-icons/md";
import { PiArchiveDuotone } from "react-icons/pi";
import { ThemeContext } from "../context/Provider";

const Sidebar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navItems = [
    {
      to: "/",
      label: "All Notes",
      icon: LuNotebook,
      end: true,
    },
    {
      to: "/pinned",
      label: "Pinned",
      icon: VscRepoPinned,
    },
    {
      to: "/archived",
      label: "Archived",
      icon: PiArchiveDuotone,
    },
  ];

  const linkStyle =
    "group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-surface-secondary hover:text-primary hover:shadow-sm";

  const activeStyle =
    "bg-primary-light text-primary shadow-sm ring-1 ring-border-light hover:bg-surface hover:text-primary";

  return (
    <aside
      className="
      fixed inset-x-0 bottom-0 z-40
      px-3 pb-3

      md:fixed md:inset-y-0 md:left-0 md:right-auto
      md:h-screen md:w-64 md:px-4 md:py-5
    "
    >
      <div
        className="flex h-[64px] w-full items-center rounded-2xl bg-surface/75 px-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-border-light
        backdrop-blur-xl
        md:h-full
        md:flex-col
        md:rounded-3xl
        md:bg-surface/60
        md:px-3
        md:py-5
        md:shadow-[0_10px_40px_rgba(0,0,0,0.04)]
        border border-border
      "
      >
        <div className="hidden w-full md:block">
          <div className="flex items-center gap-3 px-2">
            <div
              className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl
              bg-primary/10
              text-primary
            "
            >
              <GiNotebook className="text-2xl" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-[17px] font-semibold tracking-tight text-text-primary">
                Notely
              </h2>

              <p className="mt-0.5 text-[11px] text-text-muted">
                Capture. Organize. Remember.
              </p>
            </div>
          </div>
        </div>

        <nav
          className="
          flex w-full items-center justify-around gap-1
          md:flex-1
          md:flex-col
          md:items-stretch
          md:justify-center
          md:gap-1.5
        "
        >
          <p className="mb-3 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted md:block">
            Workspace
          </p>

          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${linkStyle} ${
                  isActive ? activeStyle : ""
                } justify-center md:justify-start`
              }
            >
              <Icon
                className="
                shrink-0 text-[20px]
                transition-transform duration-200
                group-hover:scale-105
              "
              />

              <span className="hidden md:block">{label}</span>
            </NavLink>
          ))}

          <button className="justify-center md:hidden text-text-primary" aria-label="theme"
          onClick={toggleTheme}
          >
            {theme === "light" ? (
              <MdWbSunny className="text-[20px]" />
            ) : (
              <MdDarkMode className="text-[20px]" />
            )}
          </button>
        </nav>

        <div className="hidden w-full md:block">
          <div className="mb-3 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />

          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            Theme
          </p>

          <button
            className={`${linkStyle} capitalize justify-center w-full cursor-pointer active:scale-90`}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <>
                <MdWbSunny className="shrink-0 text-[20px]" />
                <span>{theme}</span>
              </>
            ) : (
              <>
                <MdDarkMode className="shrink-0 text-[20px]" />
                <span>{theme}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
