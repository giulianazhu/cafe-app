function Label({ children, htmlFor }) {
  return (
    <label className="w-full py-1 pt-3 text-lg" htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default Label;
