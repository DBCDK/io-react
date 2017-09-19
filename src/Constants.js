const jobsListEndpoint = "/jobsList";
const jobsCountEndpoint = "/jobsCount";
const itemsListEndpoint = "/itemsList/:jobId";
const itemsCountEndpoint = "/itemslist/:jobId/count";
const itemJavascriptLogEndpoint = "/jobinfo/:jobId/log/:chunkId/:itemId";
const chunkItemEndpoint = "/jobinfo/:jobId/chunkItem/:chunkId/:itemId/:phase";
const flowBindersEndpoint = "/flowbindersList";

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
}

export default JobConstants;
