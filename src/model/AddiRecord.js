import AddiRecordException from "./AddiRecordException";

class AddiRecord {
	constructor(data, encoding, compression) {
		// compression is used here for lack of a better word
		// since it is actually also an encoding
		this.buffer = Buffer.from(data, compression);
		this.encoding = encoding;
		this.pos = 0;
		this.metadata = null;
		this.data = null;
		const metadataLen = Number.parseInt(this.readLine());
		if(!isNaN(metadataLen)) {
			this.metadata = this.read(metadataLen);
		} else {
			throw new AddiRecordException("no metadata length field found");
		}
		this.read();
		const dataLen = Number.parseInt(this.readLine());
		if(!isNaN(dataLen)) {
			this.data = this.read(dataLen);
		} else {
			throw new AddiRecordException("no data length field found");
		}
		if(this.metadata === null || this.data === null) {
			throw new AddiRecordException("error getting medata and data");
		}
	}
	read(numBytes) {
		if(numBytes === undefined) {
			numBytes = 1;
		}
		const oldPos = this.pos;
		if(this.pos + numBytes >= this.buffer.length) {
			this.pos = this.buffer.length - 1;
		} else {
			this.pos += numBytes;
		}
		return this.buffer.slice(oldPos, this.pos).toString(this.encoding);
	}
	readLine() {
		const bytes = [];
		do {
			let c = this.buffer.readInt8(this.pos++);
			if(c != 10) {
				bytes.push(c);
			} else {
				break;
			}
		} while(this.pos < this.buffer.length)
		return Buffer.from(bytes).toString(this.encoding);
	}
	toString() {
		return this.buffer.toString(this.encoding);
	}
}

export default AddiRecord;
