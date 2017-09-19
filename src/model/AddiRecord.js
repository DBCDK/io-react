class AddiRecord {
	constructor(data, encoding, compression) {
		// compression is used here for lack of a better word
		// since it is actually also an encoding
		this.buffer = Buffer.from(data, compression);
		this.encoding = encoding;
	}
	toString() {
		return this.buffer.toString(this.encoding);
	}
}

export default AddiRecord;
