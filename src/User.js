class User {
  constructor(userData) {
    this.id = this.checkDataType(userData.id, 'number');
    this.name = this.checkDataType(userData.name, 'string');
    this.address = this.checkDataType(userData.address, 'string');
    this.email = this.checkDataType(userData.email, 'string');
		this.strideLength = this.checkDataType(userData.strideLength, 'number');
		this.dailyStepGoal = this.checkDataType(userData.dailyStepGoal, 'number');
    this.friends = this.checkDataType(userData.friends, 'object');
	}
	
	checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	}

  getFirstName() {
    return this.name.split(' ', 1).join();
  }
  
  getFriendsNames(userRepo) {
    return this.friends.map(friendId => (userRepo.getDataFromUserID(friendId, userRepo.users).name));
  }
}

export default User;
