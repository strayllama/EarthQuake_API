const Request = require('../helpers/request.js');

const QuakeData = function(url) {
  this.url = url;
  this.apiData = [];
  this.tempData = [];
  this.data = [];
};

QuakeData.prototype.unixToDate = function (unixTime) {
  return date = new Date(unixTime);
};

QuakeData.prototype.getData = function (onComplete) {
  const request = new Request(this.url);
  request.get((data) => {
  //  console.log(data);  // log raw data to see what options I have to pull info.
    data.features.forEach((feature) => {
      this.apiData.push(feature);
    });

    this.tempData = this.apiData.filter((feature) => {
      return (feature.properties.mag > 4);
    });

    this.data = this.tempData.map((quake) => {
      return {
          title: quake.properties.title,
          date: this.unixToDate(quake.properties.time),
          magnitude: quake.properties.mag,
          lng: quake.geometry.coordinates[0],
          lat: quake.geometry.coordinates[1],
          link: quake.properties.url,
          place: quake.properties.place,
          coords: { lat: quake.geometry.coordinates[1], lng: quake.geometry.coordinates[0] },
          infoString: `Earthquake occured on: ${this.unixToDate(quake.properties.time)} </br>${quake.properties.place}.</br>Magnitude: ${quake.properties.mag}.`
      }
    });

    onComplete(this.data);
  }); // end request.get
}; // end getData

QuakeData.prototype.getQuakeByIndex = function (index) {
  return this.data[index];
};

// QuakeData.prototype.populateQuakes = function () {
//   this.data
//   quakeItem.renderQuakeDetails(selectedQuake, quakeList);
// };
//
//
module.exports = QuakeData;
