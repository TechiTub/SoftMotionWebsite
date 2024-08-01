import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSlider = () => {
  return (
    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={3000} className=" w-1/3 rounded-md">
        <img src="e30.png" className="h-full rounded-md" />
        <img src="e20.png" className="h-full rounded-md" />
        <img src="e10.png" className="h-full rounded-md" />
    </Carousel>
  );
};

export default ImageSlider;