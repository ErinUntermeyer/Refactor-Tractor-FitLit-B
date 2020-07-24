import Data from './Data';

class User extends Data{
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
	};

  getDataFromUserID(dataSet) {
    return dataSet.filter(dataItem => this.id === dataItem.userID);
  };

  getFirstName() {
		return this.name ? this.name.split(' ', 1).join() : null;
  };

  getFriendsNames(userRepo) {
		let names = [];
		if (this.friends === null) {
			return null;
		} else {
			this.friends.forEach(friend => {
				let friendMatch = userRepo.users.find(user => user.id === friend);
				names.push(friendMatch.name);
			});
			return names;
		};
  };

  findRecordSteps() {
    return super.findHighestValue(this.activityInfo, 'numSteps')
  }
};

export default User;
