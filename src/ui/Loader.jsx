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
      className={`h-[15vh] w-1/12 ${animation} bg-stone-200 sm:w-[5vw] lg:w-[3vw]`}
    ></div>
  );
}

export default Loader;
