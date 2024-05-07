import Carousel from '../../ui/Carousel';
import Error from '../../ui/Error';
import Loader from '../../ui/Loader';
import useHomeImages from './useHomeImages';

function HomeImages() {
  const { isLoading, homeImages, isError, error } = useHomeImages();

  if (isLoading) return <Loader />;
  if (isError) return <Error> {error.message} </Error>;

  // return <ImageSlider images={homeImages} />;
  return (
    <div className="flex justify-center">
      <Carousel images={homeImages} />
    </div>
  );
}

export default HomeImages;
