// Quake list is passed a quake and container, can then use method to populate list and drop down
const QuakeItem = function (selectorElement, quakeListContainer) {
  this.selectorElement = selectorElement;
  this.quakeListContainer = quakeListContainer;
};

QuakeItem.prototype.renderQuakeDropDown = function (quakeData) {
  console.log(quakeData);  // whats coming back from the fetch and being put in to the page
  quakeData.forEach((quake, index) => {
    const quakeOption = document.createElement('option');
    quakeOption.textContent = quake.title;
    quakeOption.value = index;
    this.selectorElement.appendChild(quakeOption);
  });
};

QuakeItem.prototype.renderQuakeList = function (quakeData) {
  quakeData.forEach((quake) => {
    const quakeTitle = document.createElement('li');
    quakeTitle.classList.add('bold');
    quakeTitle.textContent = `${quake.place}, Date: ${quake.date}, Magnitude: ${quake.magnitude}` ;

    const quakeDetails = document.createElement('ul');
      const quakeDate = document.createElement('li');
      quakeDate.textContent = quake.date;
      quakeDetails.appendChild(quakeDate);
    this.quakeListContainer.appendChild(quakeTitle);
    this.quakeListContainer.appendChild(quakeDetails);
  });
};

QuakeItem.prototype.addInfoMarkers = function (mainMap, quakeData) {
  quakeData.forEach((quake) => {
    mainMap.addMarkerWithInfo(quake.coords, quake.infoString);
  });
};

module.exports = QuakeItem;
