function FormButton({ children }) {
  return (
    <button className="my-3 self-start rounded-lg bg-pink-900 p-2 text-pink-100 hover:border-2 hover:border-pink-100 focus:shadow-pink-200 active:bg-pink-950">
      {children}
    </button>
  );
}

export default FormButton;
