import { Link } from "react-router-dom";
import { ChevronRight, MoveRight } from "lucide-react";
import CustomButton from "./CustomButton";
import { useCourse } from "../contexts/CourseContext";
import ClipLoader from "react-spinners/ClipLoader";
function CourseList() {
  const { courseList, loading, error } = useCourse();
  if (loading)
    return (
      <div className="text-white text-center py-10">
        <div>
          <ClipLoader color="#3b82f6" size={40} />
        </div>
        Đang tải dữ liệu...
      </div>
    );
  if (error) return <p className=" text-red-600 ">{error}</p>;
  const teachers = courseList[0]?.teachers || [];
  const randomTeachers = [...teachers]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
  return (
    <div>
      <div className="flex items-center">
        <p className="sm:text-2xl text-white font-bold my-12 flex-1">
          KHÓA HỌC <strong className="text-sky-400">NỔI BẬT</strong>
        </p>
        <Link to="/all-courses">
          <div className="flex hover:scale-105 duration-100 items-center bg-[rgba(11,78,74,1)] gap-x-2 text-white px-4 py-2 rounded-sm cursor-pointer">
            <span className="flex items-center gap-x-1">
              Xem thêm <MoveRight size={18} />
            </span>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:grid-cols-3">
        {randomTeachers.map((teacher) => (
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
                {/* button */}
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

export default CourseList;
