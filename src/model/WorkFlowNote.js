class WorkFlowNote {
	static fromJson(json) {
		const note = new this();
		note.processed = json.processed;
		note.assignee = json.assignee;
		note.description = json.description;
		return note;
	}
}

export default WorkFlowNote;
