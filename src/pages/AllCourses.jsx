import { useCourse } from "../contexts/CourseContext";
import ClipLoader from "react-spinners/ClipLoader";
function AllCourses() {
  const { courseList, loading, error } = useCourse();
  const data = courseList[0]?.teachers || [];
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
      <div>
        {data.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    </div>
  );
}

export default AllCourses;
