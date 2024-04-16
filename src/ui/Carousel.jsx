import { useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

export default function Carousel({ images }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const slider = setInterval(
      () =>
        !isPaused &&
        setImgIndex(imgIndex === images.length - 1 ? 0 : imgIndex + 1),
      3000,
    );
    return () => clearInterval(slider);
  }, [imgIndex, images.length, isPaused]);

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

  const handleHover = useCallback(function Hover(boolean) {
    setIsPaused(boolean);
  }, []);

  return (
    <Carousel.Container onHover={handleHover}>
      <Carousel.CurrentImage images={images} imgIndex={imgIndex} />
      <Carousel.Arrow position="left" onClick={handleClick} />
      <Carousel.Arrow position="right" onClick={handleClick} />
      <Carousel.Dots images={images} imgIndex={imgIndex} />
    </Carousel.Container>
  );
}

function Container({ children, onHover }) {
  return (
    <div
      // POSITION RELATIVE to act as reference for the absolutely positioned elements
      className="relative flex h-[60vw] w-full items-center justify-center"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {children}
    </div>
  );
}

function CurrentImage({ images, imgIndex }) {
  return (
    <img src={images[imgIndex].image} className="h-full w-full object-cover" />
  );
}

function Arrow({ position = 'right', onClick }) {
  return (
    <span
      className={`absolute ${position}-0 m-1 cursor-pointer select-none p-1 text-2xl sm:text-4xl md:text-5xl`}
      onClick={() => onClick(position === 'right' ? +1 : -1)}
    >
      {position === 'right' ? <FaChevronRight /> : <FaChevronLeft />}
    </span>
  );
}

function Dots({ images, imgIndex }) {
  return (
    <span className="absolute bottom-0 m-[5%] flex space-x-1 self-end p-1 text-xl md:text-2xl">
      {images.map((img) => (
        <GoDotFill
          key={img.id}
          color={images[imgIndex].id === img.id ? 'white' : 'grey'}
        />
      ))}
    </span>
  );
}

Carousel.Container = Container;
Carousel.CurrentImage = CurrentImage;
Carousel.Arrow = Arrow;
Carousel.Dots = Dots;
