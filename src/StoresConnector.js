import HttpClient from "./HttpClient.js";
import State from "./model/State.js";

const jobStoreBaseUrl = process.env.JOBSTORE_URL;
const logStoreBaseUrl = process.env.LOGSTORE_URL;
const flowStoreBaseUrl = process.env.FLOWSTORE_URL;

const jobsSearches = "jobs/searches";
const jobsCount = "jobs/searches/count";
const itemsList = "jobs/chunks/items/searches";
const itemsCount = "jobs/chunks/items/searches/count";
const flowBinders = "binders";
const flows = "flows";
const sinks = "sinks";

const phaseToPath = function(phase) {
	switch(phase) {
	case State.LIFECYCLE.PARTITIONING:
		return "partitioned";
	case State.LIFECYCLE.PROCESSING:
		return "processed/current";
	case State.LIFECYCLE.DELIVERING:
		return "delivered";
	}
	throw new TypeError(`unknown phase: ${phase}`);
};

class StoresConnector {
	static listJobs(limit, offset, callback) {
		const query = `{"filtering":[],"ordering":[{"field":"JOB_ID","sort":"DESC"}],"limit":${limit},"offset":${offset}}`;
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "application/json"})
			.with_callback(callback)
			.post(`${jobStoreBaseUrl}/${jobsSearches}`);
	}
	static countJobs(callback) {
		const query = `{"filtering":[],"ordering":[{"field":"JOB_ID","sort":"DESC"}],"limit":0,"offset":0}`;
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "application/json"})
			.with_callback(callback)
			.post(`${jobStoreBaseUrl}/${jobsCount}`);
	}
	static getJavascriptLog(jobId, chunkId, itemId, callback) {
		new HttpClient().with_callback(callback)
			.get(`${logStoreBaseUrl}/logentries/jobs/${jobId}/chunks/${chunkId}/items/${itemId}`)
	}
	static getChunkItem(jobId, chunkId, itemId, phase, callback) {
		const path = phaseToPath(phase);
		new HttpClient().with_callback(callback)
			.get(`${jobStoreBaseUrl}/jobs/${jobId}/chunks/${chunkId}/items/${itemId}/${path}`);
	}
	static listItems(jobId, limit, offset, callback) {
		const query = `{"filtering":[{"not":false,"members":[{"filter":{"field":"JOB_ID","operator":"EQUAL","value":"${jobId}"},"logicalOperator":"AND"}]}],"ordering":[],"limit":${limit},"offset":${offset}}`
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "application/json"})
			.with_callback(callback)
			.post(`${jobStoreBaseUrl}/${itemsList}`);
	}
	static countItems(jobId, callback) {
		const query = `{"filtering":[{"not":false,"members":[{"filter":{"field":"JOB_ID","operator":"EQUAL","value":"${jobId}"},"logicalOperator":"AND"}]}],"ordering":[],"limit":0,"offset":0}`
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "application/json"})
			.with_callback(callback)
			.post(`${jobStoreBaseUrl}/${itemsCount}`);
	}
	static getFlowBinders(callback) {
		new HttpClient().with_callback(callback)
			.get(`${flowStoreBaseUrl}/${flowBinders}`);
	}
	static getFlow(flowId, callback) {
		new HttpClient().with_callback(callback)
			.get(`${flowStoreBaseUrl}/${flows}/${flowId}`);
	}
	static getSink(sinkId, callback) {
		new HttpClient().with_callback(callback)
			.get(`${flowStoreBaseUrl}/${sinks}/${sinkId}`);
	}
}

export default StoresConnector;
