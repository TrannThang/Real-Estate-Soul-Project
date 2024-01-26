import { Link, NavLink } from "react-router-dom";
import Button from "../common/Button";
import { navigation } from "~/utils/constants";
import clsx from "clsx";
import withRouter from "~/hocs/withRouter";
import { twMerge } from "tailwind-merge";
import { useUserStore } from "~/store/useUserStore";
import { useAppStore } from "~/store/useAppStore";
import { Login } from "..";

const Navigation = ({ location, navigate }) => {
  const { current } = useUserStore();
  const { setModal } = useAppStore();
  return (
    <div
      className={twMerge(
        clsx(
          " w-full flex items-center justify-between bg-transparent fixed z-10 top-[85px] px-[100px] py-[26px]",
          location.pathname !== "/" && "bg-white"
        )
      )}
    >
      <Link to="">
        <img src="/logo1.png" alt="logo" className="w-[100px] object-contain" />
      </Link>
      <div
        className={clsx(
          "flex text-lg items-center gap-6 ",
          location.pathname === "/" ? "text-main-100" : "text-gray-700"
        )}
      >
        {navigation.map((el) => (
          <NavLink
            className={({ isActive }) =>
              clsx(
                isActive && " font-medium ",
                location.pathname === "/" ? "text-white" : "text-gray-900"
              )
            }
            key={el.id}
            to={el.path}
          >
            {el.text}
          </NavLink>
        ))}
        {!current ? (
          <Button
            className={twMerge(
              clsx(
                location.pathname === "/" &&
                  "bg-transparent border-main-100 border"
              )
            )}
            handleOnClick={() => setModal(true, <Login />)}
          >
            Sign In
          </Button>
        ) : (
          <Button
            className={twMerge(
              clsx(
                location.pathname === "/" &&
                  "bg-transparent border-main-100 border"
              )
            )}
          >
            Add Listing
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navigation);
