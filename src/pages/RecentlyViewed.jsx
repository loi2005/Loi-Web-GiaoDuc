import { useViewed } from "../contexts/ViewedContext";
import { Link } from "react-router-dom";
import AllCourses from "./AllCourses";
function RecentlyViewed() {
  const { viewed } = useViewed();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-white">
        📜 Lịch sử xem gần đây
      </h2>
      {viewed.length === 0 ? (
        <p className="text-white/50">Bạn chưa xem sản phẩm nào.</p>
      ) : (
        <div className=" text-white grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {viewed.map((item) => (
            <Link
              key={item.id}
              to={`/teachers/${item.id}`}
              className="bg-[#1e293b] p-4 rounded hover:bg-[#334155] duration-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.profileImage}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm opacity-60">{item.type}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentlyViewed;
