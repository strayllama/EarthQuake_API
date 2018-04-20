const QuakeView = function (selectElement, quakeContainer) {
  this.selectElement = selectElement;
  this.quakeContainer = quakeContainer;
};

QuakeView.prototype.renderSelect = function (quakeData) {
  console.log(quakeData);
  // quakeData.forEach((quake, index) => {
  //   const QuakeOption = document.createElement('option');
  //   quakeOption.textContent = quake.name;
  //   quakeOption.value = index;
  //   this.selectElement.appendChild(quakeOption);
  // });
};


QuakeView.prototype.renderDetail = function (quake) {
  const quakeTitle = document.createElement('p');
  quakeTitle.textContent = quake.title;
  this.quakeContainer.appendChild(quakeTitle);
};



module.exports = QuakeView;
