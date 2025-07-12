function CustomButton({ children }) {
  return (
    <div className="my-4 h-10 hover:opacity-85 duration-200 flex items-center bg-red-400 rounded-sm overflow-hidden">
      <button className="w-full text-white font-bold cursor-pointer">
        {children}
      </button>
    </div>
  );
}

export default CustomButton;
