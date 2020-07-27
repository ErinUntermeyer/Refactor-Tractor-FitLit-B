import User from './User';
import Data from './Data';

class UserRepo extends Data{
  constructor(users) {
    super();
    this.users = this.checkInput(users) ? users : null;
  };

  findSleepQualityGreaterThanThree(date) {
    return this.users.filter(user => {
      const sleepQualityForWeek = super.retrieveDataByWeek(user.sleepInfo, date);
      const averageSleepQuality = super.calculateAverage(sleepQualityForWeek, 'sleepQuality');
      return averageSleepQuality > 3;
    });
  };

  findMostHoursSlept(date) {
    const sleepData = this.users.map(user => super.retrieveDataByDay(user.sleepInfo, date));
    const mostHoursSlept = (sleepData.sort((a, b) => b.hoursSlept - a.hoursSlept))[0].hoursSlept;
    return this.users.filter(user => {
      let validSleepMatch = user.sleepInfo.find(sleep => {
        return sleep.date === date && sleep.hoursSlept === mostHoursSlept;
      });
      return validSleepMatch;
    });
  };

  checkInput(users) {
		if (typeof users === 'object') {
			return users.every(user => user instanceof User);
		} else {
			return null;
		};
  };

  getDataFromID(id) {
    let userMatch = this.users.find(user => id === user.id);
    return userMatch === undefined ? null : userMatch;
  };

  calculateAverageStepGoal() {
		if (this.users === null) {
			return 0;
		} else {
			const totalStepGoal = this.users.reduce((totalSteps, data) => {
				return totalSteps += data.dailyStepGoal;
			}, 0);
			return totalStepGoal / this.users.length;
		};
	};

  findAllTimeAverageAttribute(date, attribute) {
    const attributeSum = this.users.reduce((total, user) => {
      const userAttribute = super.retrieveDataByDay(user.activityInfo, date, attribute);
      total += userAttribute;
      return total;
    }, 0);
    return attributeSum / this.users.length;
  };
};

export default UserRepo;
