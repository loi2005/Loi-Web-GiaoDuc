import { useState, useEffect } from "react";
function CountDownTimer() {
  const [timeLeft, setTimeLeft] = useState(60 * 24 * 60 * 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const days = Math.floor(timeLeft / (60 * 60 * 24));
  const hours = Math.floor((timeLeft % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;
  return (
    <div className=" flex items-center h-20 gap-x-6 text-xl font-bold bg-white p-4 rounded">
      <div className="text-center">
        {String(days).padStart(2, "0")}
        <span className="block">Ngày</span>
      </div>
      <div className="text-center">
        {String(hours).padStart(2, "0")}
        <span className="block">Giờ</span>
      </div>
      <div className="text-center">
        {String(minutes).padStart(2, "0")}
        <span className="block">Phút</span>
      </div>
      <div className="text-center">
        {String(seconds).padStart(2, "0")}
        <span className="block">Giây</span>
      </div>
    </div>
  );
}

export default CountDownTimer;
