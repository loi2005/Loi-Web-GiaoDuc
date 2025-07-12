import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function SearchTeacher({
  data,
  onClose,
  query,
  setQuery,
  priceRange,
  setPriceRange,
}) {
  // Tìm kiếm + lọc giá
  const filteredData = data.filter((teacher) => {
    const nameMatch = teacher.name?.toLowerCase().includes(query.toLowerCase());
    const lessonMatch = teacher.englishLessons?.some((lesson) =>
      lesson.nameLesson?.toLowerCase().includes(query.toLowerCase())
    );
    const priceMatch =
      teacher.price >= priceRange[0] && teacher.price <= priceRange[1];

    // Nếu đang tìm kiếm, thì phải khớp cả giá + tên/bài học
    if (query.trim() !== "") {
      return (nameMatch || lessonMatch) && priceMatch;
    }

    // Nếu không tìm kiếm, chỉ lọc theo giá
    return priceMatch;
  });

  return (
    <div className="text-sm text-white/80">
      {/* Ô tìm kiếm */}
      <div className="relative px-2 mb-4">
        <input
          className="w-full outline-0 pl-2 bg-transparent border-b border-white/20 pb-1"
          type="text"
          placeholder="🔍 Nhập tên giáo viên hoặc bài học..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Bộ lọc giá */}
      <div className="px-2 mb-4">
        <label className="text-white/60 mb-1 block">
          Lọc theo giá: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          range
          min={0}
          max={200}
          value={priceRange}
          onChange={(range) => setPriceRange(range)}
        />
      </div>

      {/* Danh sách kết quả */}
      {(query.trim() !== "" ||
        priceRange[0] !== 0 ||
        priceRange[1] !== 100) && (
        <div className="max-h-[300px] overflow-y-auto pr-2">
          {filteredData.length === 0 ? (
            <p className="text-center mt-2">😔 Không tìm thấy giáo viên nào</p>
          ) : (
            <ul>
              {filteredData.map((teacher) => {
                const matchedLessons = teacher.englishLessons?.filter(
                  (lesson) =>
                    lesson.nameLesson
                      ?.toLowerCase()
                      .includes(query.toLowerCase())
                );
                return (
                  <li
                    key={teacher.id}
                    className="mb-4 hover:bg-[#1e293b] p-2 rounded"
                  >
                    <Link onClick={onClose} to={`/teachers/${teacher.id}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={teacher.profileImage}
                          alt={teacher.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <strong>{teacher.name}</strong>
                          <p className="text-xs text-white/60">
                            ${teacher.price}
                          </p>
                        </div>
                      </div>
                      {matchedLessons?.length > 0 && (
                        <ul className="ml-10 list-disc text-white/60 text-xs">
                          {matchedLessons.map((lesson) => (
                            <li key={lesson.id}>{lesson.nameLesson}</li>
                          ))}
                        </ul>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchTeacher;
