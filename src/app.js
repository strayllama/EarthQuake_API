const QuakeView = require('./views/quake-view.js')
const QuakeData = require('./models/quake-data.js')

document.addEventListener('DOMContentLoaded', () => {
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2018-04-18&endtime=2018-04-20`;

  const quakeSelect = document.getElementById('quake-select');
  const quakeContainer = document.getElementById('quake-container');

  const quakeView = new QuakeView(quakeSelect, quakeContainer);
  const quakeData = new QuakeData(url);

  quakeSelect.addEventListener('change', (event) => {
    const selectedQuakeIndex = event.target.value;
    const selectedQuake = quakeData.getQuakeByIndex(selectedQuakeIndex);
    quakeView.renderDetail(selectedQuake);
  });

  quakeData.getData((data) => {
    quakeView.renderSelect(data)
  });


}); // end DOMContentLoaded
