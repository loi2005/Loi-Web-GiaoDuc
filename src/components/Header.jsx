import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "./Search&SideBar/SideBar";
import {
  Presentation,
  History,
  LaptopMinimal,
  AlignJustify,
  LogIn,
  DiamondPlus,
  Heart,
} from "lucide-react";
function Header() {
  const [sideBarType, setSideBarType] = useState(null);
  const handleClick = (typeBar) => {
    setSideBarType(typeBar);
  };
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", sideBarType);
    return () => document.body.classList.remove("overflow-hidden");
  }, [sideBarType]);
  const navItemClass =
    "flex items-center gap-x-1 p-1 hover:bg-gray-600 duration-200 rounded-sm";
  return (
    <header className="bg-gray-800 text-white py-4 shadow">
      <div className="max-w-[1216px] mx-auto px-4 flex justify-between items-center">
        <ul className="flex items-center gap-x-4">
          <li className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold hover:text-amber-300 duration-200">
            <Link to="/">MYSTUDY</Link>
          </li>
          <li className="hidden lg:flex">
            <Link to="/all-courses" className={navItemClass}>
              <Presentation className="w-5" />
              <span>Courses</span>
            </Link>
          </li>
          <li className="hidden lg:flex">
            <Link to="/recentlyViewed" className={navItemClass}>
              <History className="w-5" />
              <span>Recently Viewed</span>
            </Link>
          </li>
          <li className="hidden lg:flex">
            <Link to="/favorites" className={navItemClass}>
              <Heart className="w-5" />
              <span>Course Liked</span>
            </Link>
          </li>
        </ul>

        <ul className="flex items-center gap-x-4">
          <li className="hidden md:flex">
            <input
              type="text"
              onFocus={() => handleClick("search")}
              placeholder="Search..."
              readOnly
              className="border border-white/20 bg-transparent text-sm text-white rounded-sm px-3 py-1 outline-none placeholder:text-white/50"
            />
          </li>
          <li className="hidden lg:flex gap-x-1 items-center">
            <LogIn className="w-5" />
            <Link to="/">Log in</Link>
          </li>
          <li className="hidden lg:flex gap-x-1 items-center">
            <DiamondPlus className="w-5" />
            <Link to="/">Sign up</Link>
          </li>
          <li className="lg:hidden">
            <button onClick={() => handleClick("bar")} className="p-1">
              <AlignJustify className="w-6 h-6" />
            </button>
          </li>

          <li>
            <LaptopMinimal className="w-5" />
          </li>
        </ul>
      </div>
      {sideBarType && (
        <SideBar type={sideBarType} onClose={() => setSideBarType(null)} />
      )}
    </header>
  );
}

export default Header;
