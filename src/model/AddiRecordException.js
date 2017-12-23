// doesn't inherit from Error because of a limitation in babel:
// https://github.com/babel/babel/issues/4058

class AddiRecordException {
	constructor(message) {
		this.message = message;
		this.name = "AddiRecordException";
	}
}

export default AddiRecordException;
