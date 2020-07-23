class Hydration extends Data {
  constructor(hydrationData) {
    super();
    this.userID = hydrationData.userID;
    this.date = hydrationData.date;
    this.numOunces = hydrationData.numOunces;
  };
};


export default Hydration;
