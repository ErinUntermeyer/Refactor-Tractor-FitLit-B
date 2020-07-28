import Data from './Data';

class Hydration extends Data {
  constructor(hydrationData) {
    super();
    this.userID = super.checkDataType(hydrationData.userID, 'number');
    this.date = super.checkDataType(hydrationData.date, 'string');
    this.numOunces = super.checkDataType(hydrationData.numOunces, 'number');
  }
}

export default Hydration;
