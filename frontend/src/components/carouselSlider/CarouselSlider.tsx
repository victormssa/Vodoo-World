import { useState, useEffect } from 'react';
import wallpaperBlack from '../../assets/imgs/textureBlack.jpg';
import wallpaperWhite from '../../assets/imgs/textureWhite.jpg';

const CarouselSlider: React.FC = () => {
  const images = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F3.bp.blogspot.com%2F-dui-f0hQUHE%2FU0Qs5dOcWII%2FAAAAAAAACpg%2FS1lb9AnsMU4%2Fs1600%2Floveable-cat-wallpaper-free.jpg&f=1&nofb=1&ipt=b7e4ef3bc71c9239a0c9e0fc078072fe26fdc750a2350e68b824ba993b60378f&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thewowstyle.com%2Fwp-content%2Fuploads%2F2015%2F04%2FGray-Cat-MorgueFile-Nov16th-2013.jpg&f=1&nofb=1&ipt=bef57a6896bdbe8883d55d11e703184b2af67c75785af7cf5a974133d7081a97&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F326875%2Fpexels-photo-326875.jpeg%3Fcs%3Dsrgb%26dl%3Dadorable-animal-blur-326875.jpg%26fm%3Djpg&f=1&nofb=1&ipt=b5c87c566e59bc13b9f63f7f24d0170eb31a20921e6cc0c03f9a428e3ed8f2bf&ipo=images"
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 4) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
      setSeconds(0);
    }
  }, [seconds, images.length]);

  const goToPrevious = () => {
    if (intervalId) clearInterval(intervalId);
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setSeconds(0);
    restartInterval();
  };

  const goToNext = () => {
    if (intervalId) clearInterval(intervalId);
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    setSeconds(0);
    restartInterval();
  };

  const restartInterval = () => {
    if (intervalId) clearInterval(intervalId);
    const interval: NodeJS.Timeout = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    setIntervalId(interval);
  };

  return (
    <>
      <section className='dark:hidden flex justify-center' style={{ background: `url(${wallpaperWhite})` }}>
        <div className="relative w-[70rem] py-10 flex justify-center transition-opacity duration-500">
          <img
            src={images[currentIndex]}
            alt="Carousel Image"
            className="lg:w-full md:w-full lg:h-[30rem] h-[15rem] w-[20rem] object-cover rounded-lg mx-auto"
          />
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full h-10 w-10 ml-10 text-6xl text-[#0000009e] hover:text-black"
            style={{ transform: 'translate(-50%, -50%)' }}
            onClick={goToPrevious}
          >
            &lt;
          </button>
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full h-10 w-10 mr-10 text-6xl text-[#0000009e] hover:text-black"
            style={{ transform: 'translate(50%, -50%)' }}
            onClick={goToNext}
          >
            &gt;
          </button>
        </div>
      </section>

      <section className='dark:flex hidden justify-center' style={{ background: `url(${wallpaperBlack})` }}>
        <div className="relative w-[70rem] py-10 flex justify-center transition-opacity duration-500">
        
          <img
            src={images[currentIndex]}
            alt="Carousel Image"
            className="lg:w-full md:w-full lg:h-[30rem] h-[15rem] w-[20rem] object-cover rounded-lg mx-auto"
          />
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full h-10 w-10 ml-10 text-6xl text-[#ffffff9e] hover:text-white"
            style={{ transform: 'translate(-50%, -50%)' }}
            onClick={goToPrevious}
          >
            &lt;
          </button>
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full h-10 w-10 mr-10 text-6xl text-[#ffffff9e] hover:text-white"
            style={{ transform: 'translate(50%, -50%)' }}
            onClick={goToNext}
          >
            &gt;
          </button>
        </div>
      </section>
    </>
  );
};

export default CarouselSlider;
