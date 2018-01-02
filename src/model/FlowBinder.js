import Constants from "../Constants";
import Flow from "./Flow";
import HttpClient from "../HttpClient";
import Path from "../utils";
import Sink from "./Sink";

class FlowBinderContent {
	save() {
		const path = new Path(Constants.createFlowBinderEndpoint);
		new HttpClient().with_data(this)
			.add_headers({"content-type": "application/json"})
			.post(path.path).then(
				json => console.log("flowbinder created", json))
		.catch(console.error.bind(console));
	}
	static fromJson(json) {
		const flowBinderContent = new this();
		flowBinderContent.charset = json.charset;
		flowBinderContent.description = json.description;
		flowBinderContent.destination = json.destination;
		flowBinderContent.flow = new Flow();
		flowBinderContent.flowId = json.flowId;
		flowBinderContent.format = json.format;
		flowBinderContent.name = json.name;
		flowBinderContent.packaging = json.packaging;
		flowBinderContent.priority = json.priority;
		flowBinderContent.recordSplitter = json.recordSplitter;
		flowBinderContent.sink = new Sink();
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
		flowBinder.content = FlowBinderContent.fromJson(json.content);
		return flowBinder;
	}
}

export {FlowBinderContent};
export default FlowBinder;
