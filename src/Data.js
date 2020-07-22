class Data {
  checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	};
  calculateAllTimeAverage(dataSet, attribute) {
    const allTimeTotal = dataSet.reduce((total, item) => {
      total += item[attribute];
      return total;
    }, 0)
    return allTimeTotal / dataSet.length;
  }
}

export default Data;
