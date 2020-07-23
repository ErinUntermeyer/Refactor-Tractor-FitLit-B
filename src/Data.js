class Data {
  checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	};

  calculateAverage(dataSet, attribute) {
    const allTimeTotal = dataSet.reduce((total, item) => {
      total += item[attribute];
      return total;
    }, 0)
    return allTimeTotal / dataSet.length;
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
}

export default Data;



// use sort on dataSet
// use find to get date match
// get the index of date match
// use slice(index, index + 7)
// then iterate through each of the objects
// push the desired property
