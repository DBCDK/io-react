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
const submitters = "submitters";

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
	static listJobs(limit, offset) {
		const limitString = limit > 0 ? `LIMIT ${limit}` : "";
		const query = `WITH job:id ORDER BY job:id DESC ${limitString} OFFSET ${offset}`
		return new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
			.post(`${jobStoreBaseUrl}/${jobsQueries}`);
	}
	static countJobs() {
		const query = `WITH job:id`
		return new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
			.post(`${jobStoreBaseUrl}/${jobsCount}`);
	}
	static getJavascriptLog(jobId, chunkId, itemId) {
		return new HttpClient().get(
			`${logStoreBaseUrl}/logentries/jobs/${jobId}/chunks/${chunkId}/items/${itemId}`)
	}
	static getChunkItem(jobId, chunkId, itemId, phase) {
		const path = phaseToPath(phase);
		return new HttpClient().get(
			`${jobStoreBaseUrl}/jobs/${jobId}/chunks/${chunkId}/items/${itemId}/${path}`);
	}
	static listItems(jobId, limit, offset) {
		const limitString = limit > 0 ? `LIMIT ${limit}` : "";
		const query = `item:jobid = ${jobId} ${limitString} OFFSET ${offset}`
		return new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
			.post(`${jobStoreBaseUrl}/${itemsList}`);
	}
	static countItems(jobId) {
		const query = `item:jobid = ${jobId}`
		return new HttpClient().with_data(query)
			.add_headers({"Content-Type": "text/plain"})
			.post(`${jobStoreBaseUrl}/${itemsCount}`);
	}
	static getFlowBinders() {
		return new HttpClient().get(`${flowStoreBaseUrl}/${flowBinders}`);
	}
	static getFlow(flowId) {
		return new HttpClient().get(`${flowStoreBaseUrl}/${flows}/${flowId}`);
	}
	static getFlows() {
		return new HttpClient().get(`${flowStoreBaseUrl}/${flows}`);
	}
	static getSink(sinkId) {
		return new HttpClient().get(`${flowStoreBaseUrl}/${sinks}/${sinkId}`);
	}
	static getSubmitter(submitterId) {
		return new HttpClient().get(`${flowStoreBaseUrl}/${submitters}/${submitterId}`);
	}
}

export default StoresConnector;
