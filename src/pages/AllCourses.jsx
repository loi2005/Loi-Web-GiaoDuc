import { useCourse } from "../contexts/CourseContext";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
function AllCourses({ viewedProducts, likedProducts }) {
  const { courseList, loading, error } = useCourse();
  console.log("viewed", viewedProducts);

  const data = courseList[0]?.teachers || [];
  const [suggestions, setSuggestions] = useState([]);
  if (loading)
    return (
      <div className="text-white text-center py-10">
        <div>
          <ClipLoader color="#3b82f6" size={40} />
        </div>
        Đang tải dữ liệu...
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;
  return (
    <div>
      <div>sdfsd</div>
    </div>
  );
}

export default AllCourses;
