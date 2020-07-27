class Data {
  checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : this.giveDefaultValue(dataType);
	};

  giveDefaultValue(dataType) {
    switch(dataType) {
      case 'string':
        return 'Invalid value given';
        break;
      case 'number':
        return 0;
        break;
      case 'object':
        return ['This user has no friends'];
        break;
    };
  };

  // checkDataSet(dataSet) {
  //   return dataSet.every(data => data instanceof Hydration || data instanceof Sleep || data instanceof Activity);
  // }

  calculateAverage(dataSet, attribute, date) {
    let attributeTotal;
    if (date) {
      attributeTotal = dataSet.reduce((total, user) => {
        const activityMatch = user.activityInfo.find(activity => activity.date === date);
        if (!activityMatch) {
          total = 0;
          return total;
        }
        total += activityMatch[attribute];
        return total;
      }, 0)
    } else {
      attributeTotal = dataSet.reduce((total, item) => {
        total += item[attribute];
        return total;
      }, 0);
    }
    return parseFloat((attributeTotal / dataSet.length).toFixed(2));
  };

  retrieveDataByDay(dataSet, date, attribute) {
		const dateMatch = dataSet.find(item => item.date === date);

    if (!dateMatch) {
      return 0;
    }

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
