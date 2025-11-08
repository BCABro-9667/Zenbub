'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rohan Verma',
    rating: 5,
    text: 'This quality of the machinery is top-notch. Our work has increased 10x efficiency. Best value for money. Highly recommend this brand.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    rating: 5,
    text: 'Excellent customer service and fast delivery. The tools were well-packaged and arrived in perfect condition.',
  },
  {
    id: 3,
    name: 'Arjit Patel',
    rating: 5,
    text: "We've been a loyal customer for years. Great products and amazing team who care about their customers.",
  },
  {
    id: 4,
    name: 'Sanjay Kumar',
    rating: 5,
    text: 'Outstanding build quality and durability. These machines have transformed our production line completely.',
  },
  {
    id: 5,
    name: 'Neha Singh',
    rating: 4,
    text: 'Very reliable products with great after-sales support. The team is always ready to help whenever needed.',
  },
  {
    id: 6,
    name: 'Rajesh Gupta',
    rating: 5,
    text: 'Best investment we made for our workshop. The efficiency and precision are simply unmatched.',
  },
  {
    id: 7,
    name: 'Anjali Mehta',
    rating: 5,
    text: 'Professional service from start to finish. The installation team was knowledgeable and courteous.',
  },
  {
    id: 8,
    name: 'Vikram Reddy',
    rating: 4,
    text: 'Good quality machinery at competitive prices. Delivery was prompt and the products exceeded expectations.',
  },
  {
    id: 9,
    name: 'Deepa Joshi',
    rating: 5,
    text: 'Highly satisfied with the purchase. The equipment is easy to operate and maintain. Excellent value!',
  },
  {
    id: 10,
    name: 'Amit Desai',
    rating: 5,
    text: 'Fantastic quality and performance. Our productivity has improved significantly since using these tools.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-12">
          Based On 2,364 users | <span className="font-semibold">4.2/5</span> based on 1,230+ reviews
        </p>

        <div className="group">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.testimonial-swiper-button-next',
              prevEl: '.testimonial-swiper-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="h-auto flex justify-center">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col w-full mx-4 shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex gap-1 mb-4 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-base leading-relaxed text-center italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900 text-center mt-auto">{testimonial.name}</p>
                </div>
              </SwiperSlide>
            ))}
            <div className="testimonial-swiper-button-prev !text-gray-900 !w-12 !h-12 after:!text-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="testimonial-swiper-button-next !text-gray-900 !w-12 !h-12 after:!text-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}