class User {
  constructor(userData, hydrationData, sleepData, activityData) {
    this.id = this.checkDataType(userData.id, 'number');
    this.name = this.checkDataType(userData.name, 'string');
    this.address = this.checkDataType(userData.address, 'string');
    this.email = this.checkDataType(userData.email, 'string');
		this.strideLength = this.checkDataType(userData.strideLength, 'number');
		this.dailyStepGoal = this.checkDataType(userData.dailyStepGoal, 'number');
    this.friends = this.checkDataType(userData.friends, 'object');
    this.hydrationInfo = this.getDataFromUserID(hydrationData);
    this.sleepInfo = this.getDataFromUserID(sleepData);
    this.activityInfo = this.getDataFromUserID(activityData);
	}

  // add additional arguments to the constructor
  // write a function that filters over the data that is being takin in
  // Input: an array of objects
  // Output: an array of objects with a diff length
  // Use a filter method
  // Iterate over each piece of data
  // if (the userID matches this.id) then we add it to the return value
  // return

  getDataFromUserID(dataSet) {
    return dataSet.filter(dataItem => this.id === dataItem.userID);
  };

	checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	}

  getFirstName() {
    return this.name.split(' ', 1).join();
  }

  getFriendsNames(userRepo) {
    let names = [];
    this.friends.forEach(friend => {
      let friendMatch = userRepo.users.find(user => user.id === friend);
      names.push(friendMatch.name);
    })
    return names;
  }
}

export default User;
