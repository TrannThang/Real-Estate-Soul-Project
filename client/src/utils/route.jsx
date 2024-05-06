import App from "~/App";
import path from "./path,";
import {
  AboutUs,
  Home,
  OurAgent,
  Properties,
  PropertyDetail,
  PublicLayout,
} from "~/pages/public";
import {
  AdminLayout,
  CreatePropertyType,
  Dashboard,
  ManagePropertyType,
} from "~/pages/admin";
import { Personal, UserLayout } from "~/pages/user";

const routes = [
  {
    path: "",
    element: <App />,
    children: [
      {
        path: path.PUBLIC_LAYOUT,
        element: <PublicLayout />,
        children: [
          {
            path: path.HOME,
            element: <Home />,
          },
          {
            path: path.ABOUT_US,
            element: <AboutUs />,
          },
          {
            path: path.OUT_AGENTS,
            element: <OurAgent />,
          },
          {
            path: path.PROPERTIES,
            element: <Properties />,
          },
          {
            path: path.PROPERTY_DETAIL__ID,
            element: <PropertyDetail />,
          },
        ],
      },
      {
        path: path.ADMIN_LAYOUT,
        element: <AdminLayout />,
        children: [
          {
            path: path.ADMIN_DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: path.CREATE_PROPERTY_TYPE,
            element: <CreatePropertyType />,
          },
          {
            path: path.MANAGE_PROPERTY_TYPE,
            element: <ManagePropertyType />,
          },
        ],
      },
      {
        path: path.USER_LAYOUT,
        element: <UserLayout />,
        children: [
          {
            path: path.PERSONAL,
            element: <Personal />,
          },
        ],
      },
    ],
  },
];

export default routes;
