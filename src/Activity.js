import Data from './Data';
import User from './User';

class Activity extends Data {
  constructor(activityData) {
    super();
    this.userID = super.checkDataType(activityData.userID, 'number');
    this.date = super.checkDataType(activityData.date, 'string');
    this.numSteps = super.checkDataType(activityData.numSteps, 'number');
    this.minutesActive = super.checkDataType(activityData.minutesActive, 'number');
    this.flightsOfStairs = super.checkDataType(activityData.flightsOfStairs, 'number');
  };

  calculateMilesWalked(user) {
    if(user instanceof User === false) {
      return null
    } else {
      return parseFloat(((this.numSteps * user.strideLength) / 5280).toFixed(2));
    }
  };

  checkStepGoal(user) {
    if(user instanceof User === false) {
      return null
    } else {
      return this.numSteps > user.dailyStepGoal;
    }
  };
};

export default Activity;
