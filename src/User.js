import Data from './Data';

class User extends Data {
  constructor(userData, hydrationData, sleepData, activityData) {
    super();
    this.id = super.checkDataType(userData.id, 'number');
    this.name = super.checkDataType(userData.name, 'string');
    this.address = super.checkDataType(userData.address, 'string');
    this.email = super.checkDataType(userData.email, 'string');
    this.strideLength = super.checkDataType(userData.strideLength, 'number');
    this.dailyStepGoal = super.checkDataType(userData.dailyStepGoal, 'number');
    this.friends = super.checkDataType(userData.friends, 'object');
    this.hydrationInfo = this.getDataFromUserID(hydrationData);
    this.sleepInfo = this.getDataFromUserID(sleepData);
    this.activityInfo = this.getDataFromUserID(activityData);
  }

  getDataFromUserID(dataSet) {
    return dataSet.filter(dataItem => this.id === dataItem.userID);
  }

  getFirstName() {
    return this.name ? this.name.split(' ', 1).join() : null;
  }

  getFriendsNames(userRepo) {
    if (this.friends == 'This user has no friends') {
      return this.friends;
    } else {
      return this.friends.map(friend => {
        const friendMatch = userRepo.users.find(user => user.id === friend);
        return friendMatch.name;
      })
    }
  }

  findRecordSteps() {
    return super.findHighestValue(this.activityInfo, 'numSteps');
  }

  findBestNightOfSleepEver() {
    const sortedArray = this.sleepInfo.sort((a, b) => {
      return (b.sleepQuality + b.hoursSlept) - (a.sleepQuality + a.hoursSlept);
    });
    return sortedArray[0];
  }

  findAllDaysStepGoalReached() {
    const stepGoalReached = this.activityInfo.filter(activity => {
      if (activity.numSteps > this.dailyStepGoal) {
        return activity.date;
      }
    });
    return stepGoalReached.map(day => day.date);
  }
}

export default User;
