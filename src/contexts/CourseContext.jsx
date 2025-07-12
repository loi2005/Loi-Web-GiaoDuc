import { createContext, useContext, useEffect, useState } from "react";
import { getCourse } from "../services/Api";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourse();

        // 👉 1. Luôn chờ 2 giây, ngay cả khi gọi API thành công
        setTimeout(() => {
          setCourseList(data);
          setLoading(false);
        }, 2000);
      } catch (err) {
        // 👉 2. Nếu lỗi, cũng đợi 2 giây rồi mới set error
        setTimeout(() => {
          setError("Không thể tải dữ liệu.");
          setLoading(false);
        }, 2000);
      }
    };

    fetchCourse();
  }, []);

  return (
    <CourseContext.Provider value={{ courseList, loading, error }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
