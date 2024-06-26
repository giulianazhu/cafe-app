import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import BookForm from '../features/bookings/BookForm';
import useDeleteBooking from '../features/bookings/useDeleteBooking';
import DeleteForm from './DeleteForm';

export default function Dashboard({ data }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(data);

  useEffect(
    function () {
      if (query.length < 1) {
        setResults(data);
      }
      if (query.length >= 1) {
        setResults(
          data.filter((d) =>
            d.name.toLowerCase().includes(query.toLowerCase()),
          ),
        );
      }
    },
    [query, data],
  );

  return (
    <Dashboard.Container>
      <Dashboard.Searchbar handleQuery={setQuery} />
      <Dashboard.List>
        {results.map((guest) => (
          <Dashboard.Item guest={guest} key={guest.id} />
        ))}
      </Dashboard.List>
    </Dashboard.Container>
  );
}

function Container({ children }) {
  return <div className="m-auto my-3 flex w-11/12 flex-wrap">{children}</div>;
}

function Searchbar({ handleQuery }) {
  return (
    <div className="my-3 flex w-full flex-[0_1_450px] items-center space-x-3">
      <label htmlFor="search" className="min-w-max text-lg">
        Search by name
      </label>
      <input
        type="text"
        id="search"
        className="w-full flex-auto rounded-lg bg-stone-300 p-1 px-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-white"
        onChange={(e) => handleQuery(e.target.value)}
        autoFocus
      />
    </div>
  );
}

function List({ children }) {
  return (
    <main className="h-max w-11/12 flex-auto rounded-md border-2 border-stone-400 p-1">
      {children}
    </main>
  );
}

function Item({ guest, handleShowForm }) {
  const [showDetails, setShowDetails] = useState(false);
  const { name, date } = guest;
  const formattedDate = format(date, 'eee yyyy-MM-dd');
  const formattedTime = format(date, 'HH:mm');

  function handleShowDetails() {
    setShowDetails(!showDetails);
  }

  return (
    <div className="my-2 divide-y-2 divide-stone-700 rounded-md border-2 border-stone-700 p-3 text-stone-300">
      <section className="flex items-center justify-between ">
        <div className="md: list-none sm:grid sm:flex-1 sm:grid-cols-[1fr_2fr]">
          <li>{`Name: ${name}`}</li>
          <div className="md:flex md:justify-around">
            <li>{`Date: ${formattedDate}`}</li>
            <li>{`Time: ${formattedTime}`}</li>
          </div>
        </div>
        <ListButton onClick={() => handleShowDetails()}>
          Details
          <span className="inline-flex">
            {showDetails ? (
              <IoMdArrowDropup className="ml-2" />
            ) : (
              <IoMdArrowDropdown className="ml-2" />
            )}
          </span>
        </ListButton>
      </section>
      {showDetails && (
        <Item.Details guest={guest} handleShowForm={handleShowForm} />
      )}
    </div>
  );
}

function Details({ guest }) {
  const { phone, email, notes } = guest;
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { isDeleting, handleDelete, isDeleteError, deleteError } =
    useDeleteBooking();

  function handleShowForm() {
    setShowForm(!showForm);
  }

  function handleDeleteForm() {
    setShowDelete(!showDelete);
  }

  // if (isDeleteError)
  //   return (
  //     <ModalWindow>
  //       <Error>{deleteError.message}</Error>
  //     </ModalWindow>
  //   );

  return (
    <>
      <div className="flex list-none flex-col py-2">
        <li>{`Phone: ${phone}`}</li>
        <li>{`Email: ${email}`}</li>
        <li>{`Notes: ${notes}`}</li>
        <div className="space-x-2 self-end">
          <div className="flex flex-col items-end">
            <ListButton onClick={() => handleShowForm()}>
              {showForm ? 'Cancel' : 'Edit'}
            </ListButton>
            {/* <ListButton onClick={() => handleDelete(guest.id)}>Delete</ListButton> */}
            <ListButton onClick={() => handleDeleteForm()}>
              {showDelete ? 'Cancel' : 'Delete'}
            </ListButton>
            {showDelete && (
              <DeleteForm
                handleDelete={handleDelete}
                id={guest.id}
                isDeleting={isDeleting}
              />
            )}
          </div>
        </div>
        <div className="sm:self-center">
          {showForm && (
            <BookForm
              showForm={showForm}
              guest={guest}
              handleShowForm={handleShowForm}
            />
          )}
        </div>
      </div>
    </>
  );
}

function ListButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="my-2 rounded-md border-2 border-stone-400 px-2 py-1"
    >
      {children}
    </button>
  );
}

Dashboard.Container = Container;
Dashboard.Searchbar = Searchbar;
Dashboard.List = List;
Dashboard.Item = Item;
Item.Details = Details;
