import HttpClient from "./HttpClient.js";
import State from "./model/State.js";

const jobStoreBaseUrl = process.env.JOBSTORE_URL;
const logStoreBaseUrl = process.env.LOGSTORE_URL;
const flowStoreBaseUrl = process.env.FLOWSTORE_URL;

const jobsQueries = "jobs/queries";
const jobsCount = "jobs/count";
const itemsList = "items/queries";
const itemsCount = "items/count";
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
		const limitString = limit > 0 ? `LIMIT ${limit}` : "";
		const query = `WITH job:id ORDER BY job:id DESC ${limitString} OFFSET ${offset}`
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
			.with_callback(callback)
			.post(`${jobStoreBaseUrl}/${jobsQueries}`);
	}
	static countJobs(callback) {
		const query = `WITH job:id`
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
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
		const limitString = limit > 0 ? `LIMIT ${limit}` : "";
		const query = `item:jobid = ${jobId} ${limitString} OFFSET ${offset}`
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
			.with_callback(callback)
			.post(`${jobStoreBaseUrl}/${itemsList}`);
	}
	static countItems(jobId, callback) {
		const query = `item:jobid = ${jobId}`
		new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
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
	static getFlows(callback) {
		new HttpClient().with_callback(callback)
			.get(`${flowStoreBaseUrl}/${flows}`);
	}
	static getSink(sinkId, callback) {
		new HttpClient().with_callback(callback)
			.get(`${flowStoreBaseUrl}/${sinks}/${sinkId}`);
	}
}

export default StoresConnector;
