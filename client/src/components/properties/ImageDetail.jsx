import clsx from "clsx";
import Carousel from "nuka-carousel";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { useAppStore } from "~/store/useAppStore";

const ImageDetail = ({
  images = [],
  slideToScroll = 1,
  slideToShow = 1,
  forceIndex = 0,
}) => {
  const [currentSlide, setCurrentSlide] = useState(() => forceIndex);
  const { setModal } = useAppStore();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-overlay-90     w-screen h-screen"
    >
      <div className="flex p-6 items-center justify-between">
        <span className="text-white font-bold">{`${currentSlide + 1}/${
          images.length
        }`}</span>
        <span className="p-2" onClick={() => setModal(false, null)}>
          <AiFillCloseCircle size={22} color="white" />
        </span>
      </div>
      <div className="flex items-center justify-center pb-24 h-full w-full">
        <div className="h-fit w-[90vw]">
          <Carousel
            className="align-middle"
            renderCenterRightControls={({ nextSlide, nextDisabled }) => (
              <button
                onClick={nextSlide}
                className={twMerge(
                  clsx(
                    "p-2 bg-gray-700 border shadow-md rounded-full",
                    nextDisabled && "hidden"
                  )
                )}
              >
                <FaCircleArrowRight size={22} color="white" />
              </button>
            )}
            renderCenterLeftControls={({ previousSlide, previousDisabled }) => (
              <button
                onClick={previousSlide}
                className={twMerge(
                  clsx(
                    "p-2 bg-gray-700 border shadow-md rounded-full",
                    previousDisabled && "hidden"
                  )
                )}
              >
                <FaCircleArrowLeft size={22} color="white" />
              </button>
            )}
            slidesToScroll={slideToScroll}
            slidesToShow={slideToShow}
            slideIndex={currentSlide}
            afterSlide={(i) => setCurrentSlide(i)}
            renderBottomCenterControls={({ currentSlide, goToSlide }) => (
              <div className=" absolute left-0 right-0 top-[calc(100%+40px)]">
                <div className="flex items-center justify-center gap-1">
                  {images.map((el, idx) => (
                    <img
                      key={idx + 1000}
                      src={el}
                      alt="picture"
                      onClick={() => goToSlide(idx)}
                      className={twMerge(
                        clsx(
                          "h-20 rounded-md  object-contain cursor-pointer",
                          currentSlide === idx && "scale-125 mx-1"
                        )
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
            // renderTopCenterControls={() => (

            // )}
          >
            {images.map((el) => (
              <img
                key={el}
                src={el}
                alt="picture"
                className="max-w-[500px] object-contain mx-auto"
              />
            ))}
            /
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
