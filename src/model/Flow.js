class FlowContent {
	static fromJson(json) {
		const content = new this();
		content.name = json.name;
		return content;
	}
}

class Flow {
	constructor() {
		this.content = new FlowContent();
		this.content.name = "";
	}
	static fromJson(json) {
		const flow = new this();
		flow.id = json.id;
		flow.version = json.version;
		flow.content = FlowContent.fromJson(json.content);
		return flow;
	}
}

export default Flow;
