import CountDownTimer from "../components/Countdown";
import CourseList from "../components/CourseList";
function Home() {
  return (
    <div>
      <div className="px-7 bg-gradient-to-r  rounded-md from-[rgba(11,78,74,1)] to-[rgba(24,38,54,1)] w-full">
        <div className=" py-13 h-full flex flex-col items-center lg:items-start">
          <span className="text-white font-bold text-2xl block text-center  ">
            NỀN TẢNG HỌC NGOẠI NGỮ HÀNG ĐẦU VIỆT NAM
          </span>
          <span className="block text-center my-3 text-red-500">
            Thời gian ưu đãi!
          </span>
          {/* timer */}
          <CountDownTimer />
        </div>
      </div>
      {/* khoa hoc noi bat */}
      <CourseList />
    </div>
  );
}

export default Home;
