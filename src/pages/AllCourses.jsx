import { useCourse } from "../contexts/CourseContext";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ChevronRight, Star, Heart } from "lucide-react";
import CustomButton from "../components/CustomButton";
function AllCourses() {
  const { courseList, loading, error } = useCourse();
  const data = courseList[0]?.teachers || [];
  const itemClass =
    "flex items-center justify-center bg-[#ffffff62] rounded-sm px-2  gap-x-1";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:grid-cols-3">
        {data.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-[rgba(15,23,43,1)] hover:shadow-blue-50  duration-300 overflow-hidden rounded-lg shadow"
          >
            <Link to={`/teachers/${teacher.id}`}>
              <iframe
                width="100%"
                height="180px"
                src={teacher.introVideo.replace(
                  "youtu.be/",
                  "www.youtube.com/embed/"
                )}
                title={teacher.name}
                allowFullScreen
              ></iframe>
              <div className="p-4">
                <div className=" text-sm text-white font-bold flex justify-end gap-6">
                  <span className={itemClass}>
                    {teacher.rating}
                    <Star
                      width={14}
                      className="fill-yellow-300 text-yellow-300"
                    />
                  </span>
                  <span className={itemClass}>
                    {teacher.liked}
                    <Heart className="fill-red-500 text-red-500" width={14} />
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-white font-bold">{teacher.name}</p>
                    <p className="text-white opacity-20 sm:text-[10px]">
                      {teacher.type}
                    </p>
                  </div>
                  <span className="text-white">
                    <ChevronRight width="17" />
                  </span>
                </div>
                <p className="text-white opacity-60 my-2 text-sm">
                  {teacher.teaches.join(" ")}
                </p>
                <p className="text-white opacity-20 sm:text-[12px]">
                  Lesson start from
                </p>
                <p className="text-white font-bold">USD {teacher.price}</p>
                <CustomButton>
                  <span>Xem chi tiết </span>
                </CustomButton>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCourses;
