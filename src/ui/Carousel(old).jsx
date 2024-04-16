import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

function CarouselSlider({ images }) {
  return (
    <Carousel images={images}>
      <Carousel.Container>
        <Carousel.CurrentImage />
        <Carousel.Arrow position="left" />
        <Carousel.Arrow position="right" />
        <Carousel.Dots />
      </Carousel.Container>
    </Carousel>
  );
}

const CarouselContext = createContext();

function Carousel({ children, images }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  //could isolate slider fn in useCallback if wanted
  useEffect(() => {
    const slider = setInterval(
      () =>
        !isPaused &&
        setImgIndex(imgIndex === images.length - 1 ? 0 : imgIndex + 1),
      3000,
    );
    return () => clearInterval(slider);
  }, [imgIndex, images.length, isPaused]);

  //TO HANDLE BOTH LEFT AND RIGHT CLICK
  const handleClick = useCallback(
    function Click(direction) {
      if (imgIndex === images.length - 1 && direction !== -1) {
        setImgIndex(0);
      } else if (imgIndex === 0 && direction === -1) {
        setImgIndex(images.length - 1);
      } else setImgIndex(imgIndex + direction);
    },
    [images.length, imgIndex],
  );

  function handleHover(boolean) {
    setIsPaused(boolean);
  }

  const values = useMemo(() => {
    images, imgIndex, isPaused, handleClick, handleHover;
  }, [images, imgIndex, isPaused, handleClick]);

  return (
    <CarouselContext.Provider value={values}>
      {children}
    </CarouselContext.Provider>
  );
}

function Container({ children }) {
  const { handleHover } = useContext(CarouselContext);
  return (
    <div
      // POSITION RELATIVE to act as reference for the absolutely positioned elements
      className="relative flex h-[60vw] w-full items-center justify-center"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {children}
    </div>
  );
}

function CurrentImage() {
  const { images, imgIndex } = useContext(CarouselContext);
  return (
    <img src={images[imgIndex].image} className="h-full w-full object-cover" />
  );
}

function Arrow({ position = 'right', children: icon, direction = +1 }) {
  const { onClick } = useContext(CarouselContext);
  return (
    <span
      className={`absolute ${position}-0 m-1 cursor-pointer select-none p-1 text-2xl sm:text-4xl md:text-5xl`}
      onClick={() => onClick(position === 'right' ? +1 : -1)}
    >
      {position === 'right' ? <FaChevronRight /> : <FaChevronLeft />}
    </span>
  );
}

function Dots() {
  const { images, imgIndex } = useContext(CarouselContext);
  return (
    <span className="absolute bottom-0 m-[5%] flex space-x-1 self-end p-1 text-xl md:text-2xl">
      {images.map((img) => (
        <GoDotFill
          key={img.id}
          color={images[imgIndex].id === img.id ? 'grey' : 'white'}
        />
      ))}
    </span>
  );
}

Carousel.Container = Container;
Carousel.CurrentImage = CurrentImage;
Carousel.Arrow = Arrow;
Carousel.Dots = Dots;

export default CarouselSlider;
