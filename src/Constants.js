const jobsListEndpoint = "/jobsList";
const jobsCountEndpoint = "/jobsCount";
const itemsListEndpoint = "/itemsList/:jobId";
const itemsCountEndpoint = "/itemslist/:jobId/count";
const itemJavascriptLogEndpoint = "/jobinfo/:jobId/log/:chunkId/:itemId";
const chunkItemEndpoint = "/jobinfo/:jobId/chunkItem/:chunkId/:itemId/:phase";
const flowBindersEndpoint = "/flowbindersList";
const singleFlowBinderEndpoint = "/flowbinders/:flowBinderId";
const createFlowBinderEndpoint = "/flowbinders/create";
const flowsEndpoint = "/flowsList";
const singleFlowEndpoint = "/flows/:flowId";
const sinksEndpoint = "/sinks/:sinkId";
const submitterEndpoint = "/submitters/:submitterId";
const submittersEndpoint = "/submitters";

class JobConstants {
	static get jobsListEndpoint() {
		return jobsListEndpoint;
	}
	static get jobsCountEndpoint() {
		return jobsCountEndpoint;
	}
	static get itemsListEndpoint() {
		return itemsListEndpoint;
	}
	static get itemJavascriptLogEndpoint() {
		return itemJavascriptLogEndpoint;
	}
	static get chunkItemEndpoint() {
		return chunkItemEndpoint;
	}
	static get itemsCountEndpoint() {
		return itemsCountEndpoint;
	}
	static get flowsEndpoint() {
		return flowsEndpoint;
	}
	static get flowBindersEndpoint() {
		return flowBindersEndpoint;
	}
	static get singleFlowBinderEndpoint() {
		return singleFlowBinderEndpoint;
	}
	static get createFlowBinderEndpoint() {
		return createFlowBinderEndpoint;
	}
	static get singleFlowEndpoint() {
		return singleFlowEndpoint;
	}
	static get sinksEndpoint() {
		return sinksEndpoint;
	}
	static get submitterEndpoint() {
		return submitterEndpoint;
	}
	static get submittersEndpoint() {
		return submittersEndpoint;
	}
}

export default JobConstants;
