function ListButton({ children, handleClick, disabled }) {
  return (
    <button
      onClick={() => handleClick()}
      className="m-1 rounded-md border-2 border-stone-400 p-1"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ListButton;
