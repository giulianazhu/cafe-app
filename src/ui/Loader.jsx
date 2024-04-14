function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black opacity-85 ">
      <Bar animation="animate-loading-bar-1" />
      <Bar animation="animate-loading-bar-2" />
      <Bar animation="animate-loading-bar-3" />
    </div>
  );
}

function Bar({ animation }) {
  return (
    <div
      className={`h-1/6 w-1/12 ${animation} bg-stone-200 sm:w-[5%] lg:w-[3%]`}
    ></div>
  );
}

export default Loader;
