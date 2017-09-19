import FlowStoreReferences from "./FlowStoreReferences";
import JobSpecification from "./JobSpecification";
import JobState from "./JobState";
import WorkFlowNote from "./WorkFlowNote";

class Job {
	static fromJson(json) {
		const job = new this();
		job.jobId = json.jobId;
		job.eoj = json.eoj;
		job.hasFatalError = json.hasFatalError;
		job.partNumber = json.partNumber;
		job.numberOfChunks = json.numberOfChunks;
		job.numberOfItems = json.numberOfItems;
		job.timeOfCreation = json.timeOfCreation;
		job.timeOfLastModification = json.timeOfLastModification;
		job.timeOfCompletion = json.timeOfCompletion;
		job.specification = JobSpecification.fromJson(json.specification);
		job.state = JobState.fromJson(json.state);
		job.flowStoreReferences = [];
		for(let reference in json.flowStoreReferences.references) {
			job.flowStoreReferences.push(FlowStoreReferences
				.fromJson(reference));
		}
		if(json.workflowNote !== null) {
			job.workflowNote = WorkFlowNote.fromJson(json.workflowNote);
		}
		return job;
	}
	status() {
		if(this.state.diagnostics.length > 0) {
			return Job.Status.DONE_WITH_ERRORS;
		} else if(this.timeOfCompletion === null || this.timeOfCompletion.length === 0) {
			return Job.Status.NOT_DONE;
		} else if(this.state.failedItems() > 0) {
			return Job.Status.DONE_WITH_ERRORS;
		} else if(this.numberOfItems !== 0 && this.numberOfChunks === 0) {
			return Job.Status.PREVIEW;
		}
		return Job.Status.DONE_WITHOUT_ERRORS;
	}
}

Job.Status = {
	DONE_WITHOUT_ERRORS: "DONE_WITHOUT_ERRORS",
	DONE_WITH_ERRORS: "DONE_WITH_ERRORS",
	NOT_DONE: "NOT_DONE",
	PREVIEW: "PREVIEW"
};

export default Job;
