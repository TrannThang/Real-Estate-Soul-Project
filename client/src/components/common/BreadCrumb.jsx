import clsx from "clsx";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const DynamicBreadCrumb = ({ location }) => {
  return <span>{location.state?.name}</span>;
};

export const breadcrumbRoutes = [
  {
    path: "/",
    breadcrumb: "Home",
  },
  {
    path: "/properties",
    breadcrumb: "Properties",
  },
  {
    path: "/properties/:id",
    breadcrumb: DynamicBreadCrumb,
  },
];

// const CustomPropsBreadcrumb = ({ someProp }) => <span>{``}</span>;

const BreadCrumb = () => {
  const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);
  return (
    <div className=" w-full flex items-center">
      {breadcrumbs.map(({ match, breadcrumb, location }, idx) => (
        <NavLink
          className="h-5"
          key={match.pathname}
          state={{ name: location.state?.name }}
          to={match.pathname}
        >
          <span
            className={twMerge(
              clsx(
                "hover:underline",
                Object.keys(match.params).length > 0 &&
                  "w-[200px] line-clamp-1 "
              )
            )}
          >
            {breadcrumb}
          </span>
          <span className="px-2">{idx < breadcrumbs.length - 1 && "/"}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default BreadCrumb;
