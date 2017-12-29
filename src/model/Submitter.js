class SubmitterContent {
	static fromJson(json) {
		const content = new this();
		content.number = json.number;
		content.name = json.name;
		content.description = json.description;
		// priority may be undefined
		content.priority = Submitter.PRIORITIES[json.priority];
		content.enabled = json.enabled;
		return content;
	}
}

class Submitter {
	static fromJson(json) {
		const submitter = new this();
		submitter.id = json.id;
		submitter.version = json.version;
		submitter.content = SubmitterContent.fromJson(json.content);
		return submitter;
	}
	toString() {
		return `${this.content.number} (${this.content.name})`;
	}
}

Submitter.PRIORITIES = {
	LOW: "LOW",
	NORMAL: "NORMAL",
	HIGH: "HIGH"
};

export default Submitter;
