import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../services/Api";
import CustomButton from "../components/CustomButton";
import ProfileTabs from "../components/ProfileTabs";
import { Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavoriteContext";
import ClipLoader from "react-spinners/ClipLoader";
function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite, toastMessage } = useFavorites();
  const favorite = isFavorite(course?.id);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
      } catch (error) {
        setError("Không thể tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 text-white">
      <div className=" md:flex-1  ">
        <div className="bg-[rgba(15,23,43,1)] rounded-xl p-5">
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-x-6">
              <img
                className="rounded-full w-14 sm:w-20 md:w-22"
                src={course.profileImage}
                alt=""
              />
              <div>
                <p>{course.name}</p>
                <p>{course.type}</p>
              </div>
            </div>
            <Heart
              className={`w-6 h-6 cursor-pointer ${
                favorite ? "text-red-500 fill-red-500" : "text-white fill-none"
              }`}
              onClick={(e) => {
                toggleFavorite(course);
              }}
            />
          </div>
          <div>
            <div className="my-5">
              <span className="block opacity-35">Teaches</span>
              <span className="font-bold">{course.teaches.join(" ")}</span>
            </div>

            <div className="my-5">
              <span className="block opacity-35">Speaks</span>
              <span className="font-bold">{course.speaks.join(" ")}</span>
            </div>
            <p className="opacity-75">{course.specialties}</p>
          </div>
          <hr className="my-5 opacity-20" />
          <div>
            <pre>{course.information.aboutMe.location}</pre>
          </div>
          <ProfileTabs course={course} />
        </div>
        {/* review */}
        <ul className="my-5 p-5 bg-[rgba(15,23,43,1)] flex text-sm text-amber-300 font-bold sm:text-base sm:h-20 rounded-xl items-center justify-around ">
          <li className="text-center">
            ⭐{course.rating} <span className="block"> Rating</span>
          </li>
          <li className="text-center">
            📘 {course.lessonsCount} <span className="block">Lesson</span>
          </li>
          <li className="text-center">
            👤{course.studentsCount} <span className="block">Student</span>
          </li>
        </ul>
        {/* lesson */}
        <p className="font-bold my-5 text-xl">English Lesson</p>
        <div className="p-5 rounded-xl bg-[rgba(15,23,43,1)]">
          {course.englishLessons.map((lesson) => (
            <div>
              <div
                className="hover:bg-[#1e293b] items-center rounded-sm gap-4 p-2 duration-200 cursor-pointer flex"
                key={lesson.id}
              >
                <div className="flex-1">
                  <span className="block font-bold">{lesson.nameLesson}</span>
                  <span className="text-sm opacity-30  ">
                    {lesson.lessonsCount}
                  </span>
                </div>
                <div>
                  <span className="block bg-red-400 p-2 rounded-sm">
                    {lesson.price}
                  </span>
                </div>
              </div>
              <hr className="opacity-30 my-3" />
            </div>
          ))}
        </div>
        {/* binh luan */}
        <p className="font-bold my-5 text-xl">
          {course.reviews.length} Bình Luận
        </p>
        <div className="md:p-5 rounded-xl  md:bg-[rgba(15,23,43,1)] grid md:grid-cols-2 gap-4">
          {course.reviews.map((review, index) => (
            <div className=" border-2 p-5 rounded-xl" key={index}>
              <div className="flex gap-4 items-center">
                <img
                  className="rounded-full md:w-10 md:h-10"
                  src={review.image}
                  alt=""
                />
                <div>
                  <span className="block md:text-sm font-bold">
                    {review.student}
                  </span>
                  <span className="text-sm opacity-60">{review.date}</span>
                </div>
              </div>
              <p className="text-sm md:text-[12px] text-justify my-4 opacity-60 ">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
      <div className="md:sticky md:top-4 rounded-xl h-fit overflow-hidden bg-[rgba(15,23,43,1)]">
        <iframe
          width="100%"
          height="300px"
          src={course.introVideo.replace("youtu.be/", "www.youtube.com/embed/")}
          title={course.name}
          allowFullScreen
        ></iframe>
        <div className="hidden md:flex mx-4 h-12 font-bold items-center">
          <span className="flex-1">Trial lesson</span>
          <span>{course.price}</span>
        </div>
        <div className="hidden md:block px-5">
          <CustomButton>
            <span>Book Lesson</span>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
