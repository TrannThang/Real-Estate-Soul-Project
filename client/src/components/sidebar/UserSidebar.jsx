import clsx from "clsx";
import { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { userSideBar } from "~/utils/constants";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { IoPlayBackOutline } from "react-icons/io5";
import { useUserStore } from "~/store/useUserStore";

const UserSideBar = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const { current } = useUserStore();
  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId))
      setActiveTabs((prev) => prev.filter((el) => el !== tabId));
    else setActiveTabs((prev) => [...prev, tabId]);
  };
  return (
    <div className="h-full bg-main-700 text-white w-full ">
      <div className="w-full flex flex-col p-4 items-center justify-center ">
        <img
          src={current?.avatar || "/user.svg"}
          alt="logo"
          className="w-20 h-20 object-cover rounded-full"
        />
        <span className="text-lg font-bold text-orange-500">
          {current?.name}
        </span>
        <span className="text-gray-200 font-bold">{current?.phone}</span>
        <span className="text-xs">
          {current?.userRoles?.map((el) => el.roleName.value)?.join(" / ")}
        </span>
      </div>
      <div className="mt-6">
        {userSideBar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2  hover:border-r-4 border-orange-700  px-4 py-3",
                    isActive && "bg-main-600 border-r-4"
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
                  className="flex items-center    justify-between px-4 py-3 cursor-pointer"
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
                            "flex items-center gap-2 hover:border-r-4 border-orange-700  px-4 py-3",
                            isActive && "bg-main-600 border-r-4"
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
                "flex items-center gap-2 hover:border-r-4 border-orange-700  px-4 py-3"
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

export default UserSideBar;
