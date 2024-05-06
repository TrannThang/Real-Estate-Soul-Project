import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./utils/route";

const router = createBrowserRouter(routes);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
