import HomeInfo from '../features/home/HomeInfo';
import HomeImages from '../features/home/HomeImages';

function Home() {
  return (
    <div className="h-max w-full">
      <HomeImages />
      <HomeInfo />
    </div>
  );
}

export default Home;
