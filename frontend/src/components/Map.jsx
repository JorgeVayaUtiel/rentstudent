import { useEffect, useRef } from 'react';

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAiSmgfpw0KOn1xMQ5Vb4phfDwzUKNcWgQ&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && window.google.maps) {
        const defaultCenter = { lat: 40.4168, lng: -3.7038 }; // fallback: Madrid
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: defaultCenter,
          zoom: 6,
        });
        mapRef.current = map;

        // 🚀 Geolocalización del navegador
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              map.setCenter({ lat: latitude, lng: longitude });
              map.setZoom(12);
            },
            (error) => {
              console.warn('Geolocalización falló o fue denegada', error);
            }
          );
        }

        // Autocomplete (usando el input externo con id="autocomplete")
        const input = document.getElementById('autocomplete');
        if (input && window.google.maps.places) {
          const autocomplete = new window.google.maps.places.Autocomplete(input);
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry && place.geometry.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              window.dispatchEvent(new CustomEvent('placeSelected', {
                detail: { lat, lng }
              }));
            }
          });
        }

        window.addEventListener('placeSelected', (e) => {
          const { lat, lng } = e.detail;
          map.setCenter({ lat, lng });
          map.setZoom(12);
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="map" className="w-full" style={{ height: '50vh', marginBottom: '1rem' }} />
    </div>
  );
}
