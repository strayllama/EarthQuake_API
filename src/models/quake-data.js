const Request = require('../helpers/request.js');

const QuakeData = function(url) {
  this.url = url;
  this.fullData = [];
  this.myData = [];
}

QuakeData.prototype.unixToDate = function (unixTime) {
  return date = new Date(unixTime * 1000);
};

QuakeData.prototype.getData = function (onComplete) {
  const request = new Request(this.url);
  request.get((data) => {
    console.log(data);
    data.features.forEach((feature) => {
      this.fullData.push(feature);
    });
    this.myData = this.fullData.map((feature) => {

      return {
        title: feature.properties.title,
        date: this.unixToDate(feature.properties.time),
        latlong: feature.geometry.coordinates

      }
    });
    onComplete(this.myData);
  });
};


module.exports = QuakeData;
