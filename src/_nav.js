import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilCursor,
  cilSpa,
} from "@coreui/icons";

import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Devices",
    to: "/dashboard",
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Gardens",
    to: "/garden",
    icon: <CIcon icon={cilSpa} customClassName="nav-icon" />,
  },
];

export default _nav;
