import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export default function LatestAds() {
  const ads = [
    { src: '/assets/imagen1.png', text: 'Madrid, España - 500€/mes' },
    { src: '/assets/imagen2.png', text: 'Barcelona, España - 550€/mes' },
    { src: '/assets/imagen3.png', text: 'Valencia, España - 450€/mes' },
    { src: '/assets/imagen4.png', text: 'Sevilla, España - 470€/mes' },
    { src: '/assets/anuncio5.jpg', text: 'Bilbao, España - 520€/mes' },
    { src: '/assets/anuncio6.jpg', text: 'Granada, España - 480€/mes' },
    { src: '/assets/anuncio7.jpg', text: 'Salamanca, España - 400€/mes' },
    { src: '/assets/anuncio8.jpg', text: 'Zaragoza, España - 490€/mes' },
    { src: '/assets/anuncio9.jpg', text: 'Cádiz, España - 450€/mes' },
    { src: '/assets/anuncio10.jpg', text: 'La Coruña, España - 430€/mes' },
  ];

  return (
    <section className="slider my-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Últimos anuncios publicados</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {ads.map((ad, i) => (
          <SwiperSlide key={i}>
            <div className="card border rounded overflow-hidden shadow">
              <img src={ad.src} alt={`Anuncio ${i + 1}`} className="w-full h-40 object-cover" />
              <p className="p-2 text-center">{ad.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
