import ItemState from "./ItemState";
import RecordInfo from "./RecordInfo";
import WorkFlowNote from "./WorkFlowNote";

class Item {
	static fromJson(json) {
		const item = new this();
		item.id = json.itemId;
		item.itemNumber = json.itemNumber;
		item.chunkId = json.chunkId;
		item.jobId = json.jobId;
		item.timeOfCreation = json.timeOfCreation;
		item.timeOfLastModification = json.timeOfLastModification;
		item.timeOfCompletion = json.timeOfCompletion;
		item.state = ItemState.fromJson(json.state);
		item.workflowNote = null;
		if(json.workflowNote !== null) {
			item.workflowNote = WorkFlowNote.fromJson(json.workflowNote);
		}
		item.recordInfo = null;
		if(json.recordInfo !== null) {
			item.recordInfo = RecordInfo.fromJson(json.recordInfo);
		}
		item.trackingId = json.trackingId;
		return item;
	}
}

export default Item;
