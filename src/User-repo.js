import User from './User';
import Data from './Data';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';

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

  checkInput(users) {
		if (typeof users === 'object') {
			return users.every(user => user instanceof User);
		} else {
			return null;
		}
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
};

export default UserRepo;
