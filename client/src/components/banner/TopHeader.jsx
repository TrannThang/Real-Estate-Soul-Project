import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import withRouter from "~/hocs/withRouter";
import { useUserStore } from "~/store/useUserStore";
import { useEffect, useRef, useState } from "react";
import { showOptions } from "~/utils/constants";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const TopHeader = ({ location }) => {
  const { current, logout } = useUserStore();
  const optionBox = useRef();
  const [isShowOptions, setIsShowOptions] = useState(false);
  useEffect(() => {
    const handleOnClick = (e) => {
      if (optionBox.current && optionBox.current.contains(e.target)) {
        setIsShowOptions(true);
      } else setIsShowOptions(false);
    };
    document.addEventListener("click", handleOnClick);
    return () => {
      document.removeEventListener("click", handleOnClick);
    };
  }, []);
  return (
    <div
      className={twMerge(
        clsx(
          "h-[85px] text-white border-b border-main-400 w-full bg-transparent flex items-center justify-between fixed z-50 top-0 px-[100px] py-[26px]",
          location.pathname !== "/" && "bg-main-700"
        )
      )}
    >
      <span className="flex items-center gap-2">
        <IoMailOutline />

        <span>
          <span>Email us at : </span>
          <span className="text-gray-300">example@mail.com</span>
        </span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center  text-gray-300 gap-6">
          <FaFacebookF />
          <FaInstagram />
          <AiOutlineYoutube size={20} />
        </div>
        <div className="flex items-center pl-8 border-l border-main-400">
          <span className="flex items-center gap-2">
            <BsTelephone />
            <span className="text-gray-300">123-456-7890</span>
          </span>
        </div>
        {current && (
          <div
            ref={optionBox}
            onClick={() => setIsShowOptions(!isShowOptions)}
            className="flex items-center relative cursor-pointer hover:bg-overlay-30 p-2 rounded-md gap-4 pl-8 border-l border-main-400"
          >
            <div className="flex flex-col gap-2">
              <span>{current?.name}</span>
              <span>
                ID: <span>{current?.id}</span>
              </span>
            </div>
            <img
              src={current?.avatar || "/user.svg"}
              alt="avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
            {current && isShowOptions && (
              <div className="absolute z-[60] right-0 top-full bg-white rounded-md drop-shadow-sm flex flex-col py-2 border text-black">
                {showOptions.map((el) => (
                  <Fragment key={el.id}>
                    {current?.userRoles?.some(
                      (role) => role.roleCode === el.code
                    ) && (
                      <Link className="px-6 hover:bg-gray-100 " to={el.path}>
                        {el?.name}
                      </Link>
                    )}
                  </Fragment>
                ))}
                <span
                  onClick={() => logout()}
                  className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(TopHeader);
