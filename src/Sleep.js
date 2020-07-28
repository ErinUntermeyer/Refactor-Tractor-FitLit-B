import Data from './Data';

class Sleep extends Data {
  constructor(sleepData) {
    super();
    this.userID = super.checkDataType(sleepData.userID, 'number');
    this.date = super.checkDataType(sleepData.date, 'string');
    this.hoursSlept = super.checkDataType(sleepData.hoursSlept, 'number');
    this.sleepQuality = super.checkDataType(sleepData.sleepQuality, 'number');
  }
}

export default Sleep;
