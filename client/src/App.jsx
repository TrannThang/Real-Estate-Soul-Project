import { Route, Routes } from "react-router-dom";
import path from "./utils/path,";
import {
  AboutUs,
  Home,
  OurAgent,
  Properties,
  PublicLayout,
  Search,
} from "./pages/public";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";

const App = () => {
  const { isShowModal } = useAppStore();
  const { getCurrent, current, token } = useUserStore();
  useEffect(() => {
    getCurrent();
  }, [token]);
  console.log(current);

  return (
    <div className="">
      {isShowModal && <Modal />}
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUT_AGENTS} element={<OurAgent />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.SEARCH} element={<Search />} />
        </Route>
      </Routes>
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
