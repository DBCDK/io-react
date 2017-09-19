class RecordInfo {
	static fromJson(json) {
		const recordInfo = new this();
		recordInfo.id = json.id;
		return recordInfo;
	}
}

export default RecordInfo;
