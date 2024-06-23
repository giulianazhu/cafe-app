import HomeInfo from '../features/home/HomeInfo';
import HomeImages from '../features/home/HomeImages';

function Home() {
  return (
    <div className="m-auto my-3 h-max w-11/12">
      <HomeImages />
      <HomeInfo />
    </div>
  );
}

export default Home;
