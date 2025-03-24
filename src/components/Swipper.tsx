import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Slider() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={true} // Ensure it's an object
            pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        >
            <SwiperSlide>
                <img src="/Images/slide5.jpg" alt="Slide 1" className="h-[45vh] w-full r" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/Images/slide1.jpg" alt="Slide 3" className="h-[45vh] w-full " />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/Images/slide3.jpg" alt="Slide 4" className="h-[45vh] w-full " />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/Images/slide4.jpg" alt="Slide 3" className="h-[45vh] w-full " />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/Images/slide2.jpg" alt="Slide 4" className="h-[45vh] w-full " />
            </SwiperSlide>
        </Swiper>
    );
}
