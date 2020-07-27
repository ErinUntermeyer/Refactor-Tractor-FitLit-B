class Data {
  checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	};

  // checkDataSet(dataSet) {
  //   return dataSet.every(data => data instanceof Hydration || data instanceof Sleep || data instanceof Activity);
  // }

  calculateAverage(dataSet, attribute) {
    const attributeTotal = dataSet.reduce((total, item) => {
      total += item[attribute];
      return total;
    }, 0);
    return parseFloat((attributeTotal / dataSet.length).toFixed(2));
  };

  retrieveDataByDay(dataSet, date, attribute) {
		const dateMatch = dataSet.find(item => item.date === date);
    if (attribute) {
      return dateMatch[attribute];
    } else {
      return dateMatch;
    };
  };

  sortByDate(dataSet) {
    return dataSet.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  retrieveDataByWeek(dataSet, date) {
    const sortedData = this.sortByDate(dataSet);
    const dateMatchIndex = sortedData.indexOf(sortedData.find(item => item.date === date));
    return sortedData.slice(dateMatchIndex, (dateMatchIndex + 7));
  };

  retrieveAttributesByWeek(dataSet, attribute, date) {
    return this.retrieveDataByWeek(dataSet, date).map(day => day[attribute]);
  };

  retrieveAverageDataByWeek(dataSet, attribute, date) {
    const weekData = this.retrieveDataByWeek(dataSet, date);
    return parseFloat((this.calculateAverage(weekData, attribute)).toFixed(2));
  };

  findHighestValue(dataSet, attribute) {
    const sortedData = dataSet.sort((a, b) => b[attribute] - a[attribute]);
    return sortedData[0];
  };
};

export default Data;
