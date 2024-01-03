import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import withRouter from "~/hocs/withRouter";

const TopHeader = ({ location }) => {
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
      </div>
    </div>
  );
};

export default withRouter(TopHeader);
