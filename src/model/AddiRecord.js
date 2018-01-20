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
		if(this.pos + numBytes > this.buffer.length) {
			this.pos = this.buffer.length;
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
	jsonToString(json) {
		return JSON.stringify(JSON.parse(json), null, 2);
	}
	// temporarily split on >< until more sophisticated xml printing
	// (and syntax highlighting)
	xmlToString(xmlString) {
		return xmlString.split(/>\s*</).join(">\n<");
	}
	prettify(data) {
		const dataTrimmed = data.trim();
		if(dataTrimmed[0] === "{" && dataTrimmed[dataTrimmed.length-1] === "}") {
			return this.jsonToString(data);
		} else {
			return this.xmlToString(data);
		}
		return data;
	}
	toString() {
		return this.prettify(this.metadata) + "\n\n" + this.prettify(this.data);
	}
}

export default AddiRecord;
