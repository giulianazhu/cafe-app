function Error({ children }) {
  return (
    <div className="m-3 flex w-2/3 items-center justify-center p-3 text-center">
      <div className="flex flex-col items-center gap-3 text-xl">
        <span className="">{children}</span>
        <img src="dogeza.png" className="md:w-2/3 lg:w-1/2" alt="" />
      </div>
    </div>
  );
}

export default Error;
