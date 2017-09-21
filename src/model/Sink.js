class SinkContent {
	static fromJson(json) {
		const content = new this();
		content.name = json.name;
		content.resource = json.resource;
		content.sinkType = json.sinkType;
		content.config = json.config;
		content.description = json.description;
		content.sequenceAnalysisOption = json.sequenceAnalysisOption;
		return content;
	}
}

class Sink {
	constructor() {
		// dummy content to set while waiting for proper content to be fetched
		this.content = new SinkContent();
		this.content.name = "";
	}
	static fromJson(json) {
		const sink = new this();
		sink.id = json.id;
		sink.version = json.version;
		sink.content = SinkContent.fromJson(json.content)
		return sink;
	}
}

export default Sink;
