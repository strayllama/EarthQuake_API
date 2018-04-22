const MapWrapper = function(container, centerStart, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: centerStart,
    zoom: zoom,
    mapTypeControl: false,
    mapTypeId: 'hybrid',
    // mapTypeId: 'satellite',
    streetViewControl: false
  });
  this.markers = [];
}; // end MapWrapper constructor


MapWrapper.prototype.zoom = function (zoom) {
   this.googleMap.zoom = zoom;
 }

MapWrapper.prototype.moveToLocation = function (lat, lng) {
  const newCenter = new google.maps.LatLng(lat, lng);
  this.googleMap.panTo(newCenter);
}

// MapWrapper.prototype.addMarker = function (coords) {
//   const marker = new google.maps.Marker({
//     map: this.googleMap,
//     position: coords
//   });
//   this.markers.push(marker);
// };


MapWrapper.prototype.addMarkerWithInfo = function (coords, aContentString) {
  const marker = new google.maps.Marker({
    map: this.googleMap,
    position: coords
  });
  const contentString = aContentString;
  const infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', () => {
    infowindow.open(this.googleMap, marker);
  });
}


module.exports = MapWrapper;
