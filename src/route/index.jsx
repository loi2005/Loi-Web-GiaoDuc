import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CourseDetail from "../pages/CourseDetail";
import FavoritePage from "../pages/FavoritePage";
import AllCourses from "../pages/AllCourses";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/teachers/:id" element={<CourseDetail />} />
      <Route path="/favorites" element={<FavoritePage />} />
      <Route path="/all-courses" element={<AllCourses />} />
    </Routes>
  );
}

export default AppRoutes;
