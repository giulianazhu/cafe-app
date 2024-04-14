import Error from '../../ui/Error';
import Loader from '../../ui/Loader';
import useHomeInfo from './useHomeInfo';

function HomeInfo() {
  const { isLoading, info, isError, error } = useHomeInfo();

  if (isLoading) return <Loader />;
  if (isError) return <Error> {error.message} </Error>;
  console.log(info);

  return (
    <main className="divide-y-2 divide-stone-500 px-3 pb-3 text-center">
      {info.map((section) => (
        <Section key={section.id}>
          <Headline>{section.title}}</Headline>
          <p>{section.content}</p>
        </Section>
      ))}
    </main>
  );
}

export default HomeInfo;

function Section({ children }) {
  return <section className="my-2">{children}</section>;
}

function Headline({ children }) {
  return <h1 className="m-1 p-1 text-xl font-semibold">{children}</h1>;
}
