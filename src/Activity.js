import Data from './Data';

class Activity extends Data {
  constructor(activityData) {
    super()
    this.userID = super.checkDataType(activityData.userID, 'number');
    this.date = super.checkDataType(activityData.date, 'string');
    this.numSteps = super.checkDataType(activityData.numSteps, 'number');
    this.minutesActive = super.checkDataType(activityData.minutesActive, 'number');
    this.flightsOfStairs = super.checkDataType(activityData.flightsOfStairs, 'number');
  };
};

export default Activity;
