import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MoveRight, Star, Heart, Lightbulb } from "lucide-react";
import CustomButton from "./CustomButton";
import { useCourse } from "../contexts/CourseContext";
import ClipLoader from "react-spinners/ClipLoader";

function CourseList() {
  const { courseList, loading, error } = useCourse();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

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

  const randomTeachers = [...teachers].sort(() => Math.random() - 0.5);
  const suggestedTeachers = [...teachers].sort((a, b) => b.rating - a.rating);

  const selectedList = showSuggestions ? suggestedTeachers : randomTeachers;
  const displayedTeachers = selectedList.slice(0, visibleCount);

  const hasMore = visibleCount < selectedList.length;

  const handleReadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleToggleSuggestion = () => {
    setShowSuggestions((prev) => !prev);
    setVisibleCount(6); // reset lại khi đổi chế độ
  };

  const itemClass =
    "flex items-center justify-center bg-[#ffffff62] rounded-sm px-2  gap-x-1";
  return (
    <div>
      <div className="text-sm flex items-center">
        <p className=" text-white font-bold my-12 flex-1">
          KHÓA HỌC{" "}
          <strong className=" text-sky-400">
            {showSuggestions ? "ĐƯỢC ĐÁNH GIÁ CAO" : "NỔI BẬT"}
          </strong>
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleToggleSuggestion}
            className="cursor-pointer p-2 hover:scale-105 duration-200 bg-[rgba(11,78,74,1)]  text-white  rounded-sm flex items-center gap-x-1"
          >
            Gợi ý Khóa học
            <Lightbulb size={18} className="text-yellow-400" />
          </button>
          <Link to="/all-courses">
            <button className="cursor-pointer p-2 hover:scale-105 duration-200 bg-[rgba(11,78,74,1)]  text-white  rounded-sm flex items-center gap-x-1">
              Xem thêm <MoveRight size={18} />
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:grid-cols-3">
        {displayedTeachers.map((teacher) => (
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

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleReadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded shadow"
          >
            Hiển thị thêm
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseList;
