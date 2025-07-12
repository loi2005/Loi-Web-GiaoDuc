import axios from "axios";
const BASE_URL = "/assets/data/teacher.json";

export const getCourse = async () => {
  try {
    const response = await axios.get(BASE_URL);

    // Kiểm tra dữ liệu có đúng là mảng không
    if (!Array.isArray(response.data)) {
      throw new Error("Dữ liệu trả về không hợp lệ.");
    }

    return response.data;
  } catch (error) {
    console.error(" Lỗi khi gọi API:", error);
    throw new Error("Không thể tải dữ liệu");
  }
};

export const getCourseById = async (id) => {
  try {
    const res = await axios.get(BASE_URL);
    const allTeachers = res.data?.[0]?.teachers || [];

    const teacher = allTeachers.find((item) => String(item.id) === String(id));

    if (!teacher) throw new Error("Không tìm thấy khóa học.");

    return teacher;
  } catch (error) {
    console.error("Lỗi khi tải khóa học:", error);
    throw error;
  }
};
