class Data {
  constructor(userID, date) {
    this.userID = this.checkDataType(userID, 'number');
    this.date = this.checkDataType(date, "string");
  }
  checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	};
}


export default Data;
