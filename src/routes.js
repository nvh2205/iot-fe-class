import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Garden = React.lazy(() => import("./views/garden/Garden"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/garden", name: "Dashboard", element: Garden },
];

export default routes;
