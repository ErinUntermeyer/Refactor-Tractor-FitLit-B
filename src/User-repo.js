import User from './User';

class UserRepo {
  constructor(users) {
    this.users = this.checkInput(users) ? users : null;
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
