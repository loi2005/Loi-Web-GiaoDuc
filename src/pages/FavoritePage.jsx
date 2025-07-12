import { useFavorites } from "../contexts/FavoriteContext";
import { Link } from "react-router-dom";

function FavoritePage() {
  const { favorites } = useFavorites();

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">
        Danh sách yêu thích {favorites.length} ❤️
      </h2>
      {favorites.length === 0 ? (
        <p>Chưa có mục nào được yêu thích.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((course) => (
            <Link
              key={course.id}
              to={`/teachers/${course.id}`}
              className="bg-[#1e293b] p-4 rounded hover:bg-[#334155] duration-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={course.profileImage}
                  alt={course.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{course.name}</p>
                  <p className="text-sm opacity-60">{course.type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritePage;
