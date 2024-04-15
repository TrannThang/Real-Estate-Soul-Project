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
import {
  AdminLayout,
  CreatePropertyType,
  Dashboard,
  ManagePropertyType,
} from "./pages/admin";
import { Personal, UserLayout } from "./pages/user";
import { usePropertiesStore } from "./store/useProperties";

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
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.OUT_AGENTS} element={<OurAgent />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.SEARCH} element={<Search />} />
        </Route>
        {/* Admin route */}
        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route
            path={path.CREATE_PROPERTY_TYPE}
            element={<CreatePropertyType />}
          />
          <Route
            path={path.MANAGE_PROPERTY_TYPE}
            element={<ManagePropertyType />}
          />
        </Route>

        {/* UserRoute */}

        <Route path={path.USER_LAYOUT} element={<UserLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
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
