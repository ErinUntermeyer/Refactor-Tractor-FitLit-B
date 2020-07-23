class Data {
  checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	};

  calculateAverage(dataSet, attribute) {
    const attributeTotal = dataSet.reduce((total, item) => {
      total += item[attribute];
      return total;
    }, 0)
    return attributeTotal / dataSet.length;
  }

  retrieveDataByDay(dataSet, attribute, date) {
    const dateMatch = dataSet.find(item => item.date === date);
    return dateMatch[attribute];
  }

  sortByDate(dataSet) {
    return dataSet.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  retrieveDataByWeek(dataSet, date) {
    const sortedData = this.sortByDate(dataSet);
    const dateMatchIndex = sortedData.indexOf(sortedData.find(item => item.date === date));
    return sortedData.slice(dateMatchIndex, (dateMatchIndex + 7));
  }

  retrieveAttributesByWeek(dataSet, attribute, date) {
    return this.retrieveDataByWeek(dataSet, date).map(day => day[attribute]);
  }

  retrieveAverageDataByWeek(dataSet, attribute, date) {
    const weekData = this.retrieveDataByWeek(dataSet, date);
    return parseFloat((this.calculateAverage(weekData, attribute)).toFixed(2));
  }

  findHighestValue(dataSet, attribute) {
    const sortedData = dataSet.sort((a, b) => b[attribute] - a[attribute]);
    return sortedData[0][attribute]
  }
}

export default Data;
