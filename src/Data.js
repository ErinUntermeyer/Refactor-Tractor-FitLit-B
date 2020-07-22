class Data {
  checkDataType(attribute, dataType) {
		return typeof attribute === dataType ? attribute : null;
	};
}


export default Data;
