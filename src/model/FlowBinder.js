class FlowBinderContent {
	static fromJson(json) {
		const flowBinderContent = new this();
		flowBinderContent.charset = json.charset;
		flowBinderContent.description = json.description;
		flowBinderContent.destination = json.destination;
		flowBinderContent.flowId = json.flowId;
		flowBinderContent.format = json.format;
		flowBinderContent.name = json.name;
		flowBinderContent.packaging = json.packaging;
		flowBinderContent.priority = json.priority;
		flowBinderContent.recordSplitter = json.recordSplitter;
		flowBinderContent.sinkId = json.sinkId;
		flowBinderContent.submitterIds = json.submitterIds;
		return flowBinderContent;
	}
}

class FlowBinder {
	static fromJson(json) {
		const flowBinder = new this();
		flowBinder.id = json.id;
		flowBinder.version = json.version;
		flowBinder.content = null;
		flowBinder.content = FlowBinderContent.fromJson(json.content);
		return flowBinder;
	}
}

export default FlowBinder;
