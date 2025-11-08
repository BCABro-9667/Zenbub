'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Slide {
  _id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink?: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchSlides();
    
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get('/api/banners');
      if (response.data.success) {
        setSlides(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  // Mobile slider images
  const mobileSlides = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dxtyioftt/image/upload/v1762593038/boy_aqgllj.png',
      alt: 'Boy Collection'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dxtyioftt/image/upload/v1762593039/girls_r9lnek.png',
      alt: 'Girl Collection'
    }
  ];

  if (slides.length === 0) {
    return (
      <section className="w-full pt-10 pb-8 px-2 sm:px-0">
        <div className="mx-[1%]">
          <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl sm:rounded-3xl">
            {isMobile ? (
              // Mobile: Show slider with both images
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ 
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-gray-400',
                  bulletActiveClass: 'swiper-pagination-bullet-active !bg-black'
                }}
                className="h-full"
              >
                {mobileSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <Link href="/shop" className="block w-full h-full">
                      <img 
                        src={slide.image}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              // Desktop: Show main banner
              <div className="h-full w-full">
                <Link href="/shop" className="block w-full h-full">
                  <img 
                    src="https://res.cloudinary.com/dxtyioftt/image/upload/v1762595872/Your_paragraph_text_2_detfzm.png"
                    alt="Welcome to our store"
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pt-10 pb-8 px-2 sm:px-0">
      <div className="mx-[1%]">
        <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-2xl sm:rounded-3xl">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-400',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-black'
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="h-full"
          >
          {slides.map((slide) => (
            <SwiperSlide key={slide._id}>
              <div className="h-full w-full">
                {slide.image && (
                  <Link href={slide.buttonLink || '/shop'} className="block w-full h-full">
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                )}
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !hidden md:!flex !text-gray-900 !w-10 !h-10 after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="swiper-button-next !hidden md:!flex !text-gray-900 !w-10 !h-10 after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Swiper>
      </div>
    </div>
    </section>
  );
}
