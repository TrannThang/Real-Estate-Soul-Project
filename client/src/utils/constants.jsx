import path from "./path,";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";

export const navigation = [
  {
    id: 1,
    path: "/",
    text: "HOME",
  },
  {
    id: 2,
    path: `/${path.ABOUT_US}`,
    text: "ABOUT US",
  },
  {
    id: 3,
    path: `/${path.OUT_AGENTS}`,
    text: "OUR AGENTS",
  },
  {
    id: 4,
    path: `/${path.PROPERTIES}`,
    text: "PROPERTIES",
  },
  {
    id: 5,
    path: `/${path.SEARCH}`,
    text: "SEARCH",
  },
];

export const adminSideBar = [
  {
    id: 12,
    name: "Dashboard",
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <RiDashboardLine />,
    type: "SINGLE",
  },
  {
    id: 122,
    name: "Property Types",
    icon: <BsFillHouseAddFill />,
    type: "PARENT",
    subs: [
      {
        id: 129,
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
        name: "Create new",
      },
      {
        id: 130,
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
        name: "Manage",
      },
    ],
  },
];
export const userSideBar = [
  {
    id: 12,
    name: "Personal",
    path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
    icon: <FaRegUserCircle />,
    type: "SINGLE",
  },
];

export const showOptions = [
  {
    id: 1,
    name: "Personal",
    code: "ROL7",
    path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
  },
  {
    id: 2,
    name: "Agent",
    code: "ROL5",
    path: `/${path.AGENT_LAYOUT}/${path.AGENT_DASHBOARD}`,
  },
  {
    id: 3,
    name: "Owner",
    code: "ROL3",
    path: `/${path.OWNER_LAYOUT}/${path.OWNER_DASHBOARD}`,
  },
  {
    id: 4,
    name: "Admin",
    code: "ROL1",
    path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
  },
];
