let googleMap = undefined;
// Initialize and add the map
function initMap() {
  googleMap = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: {lat: 0, lng: 0}});
};
chrome.runtime.onMessage.addListener((request) => {
  if (request.msg === 'location_found') {
    const location = {lat: Number.parseFloat(request.data.lat), lng: Number.parseFloat(request.data.lng)};
    new google.maps.Marker({position: location, map: googleMap})
  }
});
