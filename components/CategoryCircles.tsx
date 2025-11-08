'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ICategory } from '@/models/Category';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryCirclesProps {
  categories: ICategory[];
}

export default function CategoryCircles({ categories }: CategoryCirclesProps) {
  console.log('Total categories received:', categories.length);
  console.log('Categories:', categories.map(c => c.name));
  
  return (
    <div className="group relative">
      {/* Navigation Buttons - Hidden on mobile */}
      <div className="category-swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </div>
      <div className="category-swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </div>
      
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        loop={categories.length > 2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.category-swiper-button-next',
          prevEl: '.category-swiper-button-prev',
        }}
        breakpoints={{
          480: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        className="py-4"
      >
        {categories.map((category) => (
          <SwiperSlide key={category._id} className="flex justify-center">
            <Link
              href={`/category/${category.slug}`}
              className="flex flex-col items-center justify-between h-full"
            >
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded-full flex items-center justify-center mb-3 sm:mb-4 hover:border-gray-400 transition-all border border-gray-200 p-2 overflow-hidden">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={170}
                    height={170}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl md:text-4xl">{category.icon || '📦'}</span>
                )}
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center mt-2 line-clamp-2">
                {category.name}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}