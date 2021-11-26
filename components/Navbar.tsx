import Link from "next/link";
import React from "react";

import { MoonIcon, SearchIcon } from "@heroicons/react/outline";

const Navbar: React.FC = () => {
  return (
    <div className="h-20 flex items-center w-full justify-between px-8">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <a className="bg-yellow-400 p-2 rounded-lg flex-shrink-0">NFT</a>
          <span className="sm:hidden lg:inline-flex ml-2 text-xl font-bold">
            Project X - NFT
          </span>
        </div>
      </Link>

      <div className="flex bg-gray-200 rounded-2xl h-10 items-center px-4">
        <SearchIcon className="h-6 text-gray-400" />
        <input
          type="text"
          className="bg-gray-200 border-0 focus:outline-none focus:ring-0"
          placeholder="Collection, item"
        />
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/">
          <a
            href=""
            className="text-base text-gray-900 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            Explore NFTs
          </a>
        </Link>

        <Link href="/creatordashboard">
          <a
            href=""
            className="text-base text-gray-400 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            NFT Creator Dashboard
          </a>
        </Link>

        <Link href="/myassets">
          <a
            href=""
            className="text-base text-gray-400 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            My NFTs
          </a>
        </Link>
      </div>

      <div className="flex items-center space-x-3 ">
        <Link href="/createitem">
          <button className="flex flex-shrink-0 h-10 px-5 justify-center text-sm rounded-full items-center font-semibold border border-solid border-gray-200 hover:border-gray-400 transition-colors">
            Create NFT
          </button>
        </Link>
        {/* <button className="flex flex-shrink-0 h-10 px-5 justify-center text-sm rounded-full items-center font-semibold border border-solid border-gray-200 hover:border-gray-400 transition-colors">
          Login
        </button> */}
        <button className="flex flex-shrink-0 h-10 px-5 justify-center text-sm rounded-full items-center font-semibold border border-solid border-gray-200 hover:border-gray-400 transition-colors">
          <MoonIcon className="h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
