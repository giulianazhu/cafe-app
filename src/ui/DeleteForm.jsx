import { CgSpinner } from 'react-icons/cg';

function DeleteForm({ id, handleDelete, isDeleting }) {
  return (
    <div className="space-x-2  font-thin italic">
      <span>Please confirm deletion</span>
      <button
        className="my-2  rounded-md border-2 border-stone-400 bg-pink-800 px-2 py-1"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? (
          <span className="flex items-center">
            Deleting
            <CgSpinner className="ml-1 inline animate-spin" />
          </span>
        ) : (
          'Delete'
        )}
      </button>
    </div>
  );
}

export default DeleteForm;
