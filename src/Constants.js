const jobsListEndpoint = "/jobsList";
const jobsCountEndpoint = "/jobsCount";
const itemsListEndpoint = "/itemsList/:jobId";
const itemsCountEndpoint = "/itemslist/:jobId/count";
const itemJavascriptLogEndpoint = "/jobinfo/:jobId/log/:chunkId/:itemId";
const chunkItemEndpoint = "/jobinfo/:jobId/chunkItem/:chunkId/:itemId/:phase";
const flowBindersEndpoint = "/flowbindersList";
const flowsEndpoint = "/flows/:flowId";
const sinksEndpoint = "/sinks/:sinkId";

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
	static get flowBindersEndpoint() {
		return flowBindersEndpoint;
	}
	static get flowsEndpoint() {
		return flowsEndpoint;
	}
	static get sinksEndpoint() {
		return sinksEndpoint;
	}
}

export default JobConstants;
