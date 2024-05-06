import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import { usePropertiesStore } from "./store/useProperties";
import { Outlet } from "react-router-dom";

const App = () => {
  const { isShowModal } = useAppStore();
  const { getCurrent, getRoles, token } = useUserStore();
  const { getPropertyTypes } = usePropertiesStore();
  useEffect(() => {
    getCurrent();
    getRoles();
    getPropertyTypes({ fields: "id,name,image" });
  }, [token]);

  return (
    <div className="">
      {isShowModal && <Modal />}
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
