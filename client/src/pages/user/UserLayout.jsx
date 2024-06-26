import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Login, UserSidebar } from "~/components";
import { useAppStore } from "~/store/useAppStore";
import { useUserStore } from "~/store/useUserStore";

const UserLayout = () => {
  const { current } = useUserStore();
  const { setModal } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!current || !current?.userRoles.some((el) => el.roleCode === "ROL7")) {
      Swal.fire({
        icon: "info",
        title: "Oops~",
        text: "Login required",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "Go Homepage",
        confirmButtonText: "Go Login",
      }).then((response) => {
        if (response.isConfirmed) setModal(true, <Login />);
        if (response.isDismissed) navigate("/");
      });
    }
  }, [current]);

  return (
    <>
      {current?.userRoles?.some((el) => el.roleCode === "ROL7") && (
        <div className="w-full grid grid-cols-12 min-h-screen max-h-screen overflow-y-auto ">
          <div className="col-span-2">
            <UserSidebar />
          </div>
          <div className="col-span-10">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default UserLayout;
