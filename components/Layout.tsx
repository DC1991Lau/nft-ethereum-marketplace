import Link from "next/link";
import React from "react";

import { MoonIcon, SearchIcon } from "@heroicons/react/outline";

const Layout: React.FC = ({ children }) => {
  return <div className="px-8 pt-2 pb-4 max-w-full">{children}</div>;
};

export default Layout;
