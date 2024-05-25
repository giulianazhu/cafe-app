function DeleteForm({ id, handleDelete }) {
  return (
    <div>
      Please confirm deletion
      <button className="bg-stone-400" onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  );
}

export default DeleteForm;
