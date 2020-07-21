import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData) {
    this.userID = sleepData.userID;
    this.date = sleepData.date;
    this.hoursSlept = sleepData.hoursSlept;
    this.sleepQuality = sleepData.sleepQuality;
  }

  calculateDailySleep(id, date) {
    let findSleepByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepByDate.hoursSlept;
  }
  calculateDailySleepQuality(id, date) {
    let findSleepQualityByDate = this.sleepData.find((data) => id === data.userID && date === data.date);
    return findSleepQualityByDate.sleepQuality;
  }
  calculateWeekSleep(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }
  calculateWeekSleepQuality(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }
  calculateAllUserSleepQuality() {
    var totalSleepQuality = this.sleepData.reduce(function(sumSoFar, dataItem) {
      sumSoFar += dataItem.sleepQuality;
      return sumSoFar;
    }, 0)
    return totalSleepQuality / sleepData.length
  }

  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = sortedArray.filter(function(element) {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });

    let bestSleeperIds = bestSleepers.map(function(bestSleeper) {
      return (Object.keys(bestSleeper));
    });

    return bestSleeperIds.map(function(sleepNumber) {
      return userRepo.getDataFromID(parseInt(sleepNumber)).name;
    });
  }
}


export default Sleep;
