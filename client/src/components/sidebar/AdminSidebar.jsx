import clsx from "clsx";
import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { adminSideBar } from "~/utils/constants";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { IoPlayBackOutline } from "react-icons/io5";

const AdminSidebar = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => el !== tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };
  return (
    <div className="h-screen w-full ">
      <div className="w-full flex flex-col p-4 items-center justify-center ">
        <img src="/logo.png" alt="logo" className="w-4/5 object-contain" />
        <small className="text-red-100 italic">Admin workspace</small>
      </div>
      <div className="mt-6">
        {adminSideBar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700  px-4 py-3",
                    isActive && "bg-main-700 border-r-4"
                  )
                }
              >
                <span className="text-2xl">{el.icon}</span>
                <span className="select-none">{el.name}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <>
                <div
                  onClick={() => handleActiveTabs(el.id)}
                  className="flex items-center  hover:bg-main-700  justify-between px-4 py-3 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{el.icon}</span>
                    <span className="select-none">{el.name}</span>
                  </span>

                  {activeTabs.some((tabId) => tabId === el.id) ? (
                    <FaCaretDown size={20} />
                  ) : (
                    <FaCaretRight size={20} />
                  )}
                </div>
                {activeTabs.some((tabId) => tabId === el.id) && (
                  <div className="">
                    {el.subs.map((sub) => (
                      <NavLink
                        to={sub.path}
                        key={sub.id}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700  px-4 py-3",
                            isActive && "bg-main-700 border-r-4"
                          )
                        }
                      >
                        <span className="select-none">{sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
            <Link
              to={"/"}
              className={clsx(
                "flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700  px-4 py-3"
              )}
            >
              <span className="text-2xl">
                <IoPlayBackOutline />
              </span>
              <span className="select-none">Go homepage</span>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
