import Data from './Data';

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
    return parseFloat(((this.numSteps * user.strideLength) / 5280).toFixed(2));
  }
};

export default Activity;

// Input: a user and date/day
// Output: the number of miles the user walked that day
