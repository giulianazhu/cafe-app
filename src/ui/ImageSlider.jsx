import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

function ImageSlider({ images }) {
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
  function handleClick(direction) {
    if (imgIndex === images.length - 1 && direction !== -1) {
      setImgIndex(0);
    } else if (imgIndex === 0 && direction === -1) {
      setImgIndex(images.length - 1);
    } else setImgIndex(imgIndex + direction);
    // setImgIndex(imgIndex === images.length - 1 ? 0 : imgIndex + 1);
    // console.log(imgIndex);
    // console.log('clicked');
  }
  ///add hover effect to stop interval
  function handleHover(boolean) {
    setIsPaused(boolean);
  }

  return (
    <div
      className="relative flex h-[60vw] w-full items-center justify-center"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <img
        src={images[imgIndex].image}
        className="h-full w-full object-cover"
      />
      {/* OPTIONAL TITLE AND DESCRIPTION FOR HOME IMAGES BUT LOOKED MESSY SO I REMOVED IT */}
      {/*       
      <section className="xs:right-15 xs:text-lg absolute right-10 h-[10em] w-[15em] overflow-hidden font-semibold text-white sm:right-20 md:right-24 md:w-80 md:text-xl md:leading-relaxed lg:right-32 lg:text-4xl lg:leading-loose">
        <h1 className="font-bold"> {images[imgIndex].title} </h1>
        <p className="relative">{images[imgIndex].description}</p>
      </section> */}

      {/* SELECT-NONE to avoid clicking icon causing other text to be selected */}
      {/* RESPONSIVE FONT-SIZE as react-icon default size = 1em = relative to parent/element font-size */}
      <span
        className="absolute left-0 m-1 cursor-pointer select-none p-1 text-2xl sm:text-4xl md:text-5xl"
        onClick={() => handleClick(-1)}
      >
        <FaChevronLeft />
      </span>
      <span
        className="absolute right-0 m-1 cursor-pointer select-none p-1 text-2xl sm:text-4xl md:text-5xl"
        onClick={() => handleClick(+1)}
      >
        <FaChevronRight />
      </span>
      <span className="absolute bottom-0 m-[5%] flex space-x-1 self-end p-1 text-xl md:text-2xl">
        {images.map((img) => (
          <GoDotFill
            key={img.id}
            color={images[imgIndex].id === img.id ? 'grey' : 'white'}
          />
        ))}
      </span>
    </div>
  );
}

export default ImageSlider;
