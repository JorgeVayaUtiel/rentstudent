
document.addEventListener('DOMContentLoaded', () => {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.4168, lng: -3.7038 },
    zoom: 6,
  });

  const input = document.getElementById('autocomplete');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      map.setCenter(place.geometry.location);
      map.setZoom(12);
    }
  });
});
