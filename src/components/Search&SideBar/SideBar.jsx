import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCourse } from "../../contexts/CourseContext";
import {
  Presentation,
  Phone,
  LogIn,
  DiamondPlus,
  X,
  Heart,
} from "lucide-react";
import SearchTeacher from "./SearchFilter"; // 👈 import component riêng

const navLinks = [
  { icon: Presentation, text: "Courses", to: "/all-courses" },
  { icon: Heart, text: "Course Liked", to: "/favorites" },
  { icon: Phone, text: "Contact Us", to: "/" },
  { icon: LogIn, text: "Log in", to: null },
  { icon: DiamondPlus, text: "Sign up", to: null },
];

const menuItemClass =
  "px-2 h-[40px] flex items-center hover:bg-[#1e293b] duration-200 rounded-sm";

const NavItem = ({ icon: Icon, text, to, onClose }) => (
  <li className={menuItemClass}>
    {to ? (
      <Link
        to={to}
        onClick={onClose}
        className="flex items-center w-full h-full"
      >
        <Icon className="w-5 h-5" />
        <span className="ml-2">{text}</span>
      </Link>
    ) : (
      <div
        onClick={onClose}
        className="flex items-center w-full h-full cursor-pointer"
      >
        <Icon className="w-5 h-5" />
        <span className="ml-2">{text}</span>
      </div>
    )}
  </li>
);

function SideBar({ type, onClose }) {
  const { courseList } = useCourse();
  const data = courseList[0]?.teachers || [];
  const ref = useRef();

  // ✅ Quản lý query và priceFilter tại đây
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);

  // ✅ Xác định đang lọc hay tìm kiếm
  const isFiltering =
    query.trim() !== "" || priceRange[0] !== 0 || priceRange[1] !== 100;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const renderSidebarContent = () => (
    <ul className="flex flex-col w-full px-5 gap-y-6 py-6">
      {/* Header */}
      <li className="h-[50px] flex items-center justify-between">
        <Link to="/" onClick={onClose} className="text-lg font-bold">
          MYSTUDY
        </Link>
        <X
          onClick={onClose}
          className="cursor-pointer hover:bg-[#1e293b] rounded-sm p-1"
        />
      </li>

      {/* Search và Filter */}
      <SearchTeacher
        data={data}
        onClose={onClose}
        query={query}
        setQuery={setQuery}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* Hiển thị menu mặc định nếu không tìm/không lọc */}
      {!isFiltering && (
        <>
          <hr className="border-white/10 my-4" />
          {navLinks.map((item, index) => (
            <NavItem key={index} {...item} onClose={onClose} />
          ))}
        </>
      )}
    </ul>
  );

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />
      {type === "bar" ? (
        <div
          ref={ref}
          className="absolute right-0 top-0 w-full max-w-[448px] h-full bg-[#0f172b] text-white shadow-lg"
        >
          {renderSidebarContent()}
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div
            ref={ref}
            className="w-full max-w-[448px] h-auto bg-[#0f172b] text-white shadow-lg rounded-md"
          >
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
