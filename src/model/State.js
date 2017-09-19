import Diagnostic from "./Diagnostic";

class LifecycleState {
	static fromJson(json) {
		const state = new this();
		state.beginDate = json.beginDate;
		state.endDate = json.endDate;
		state.succeeded = json.succeeded;
		state.failed = json.failed;
		state.ignored = json.ignored;
		return state;
	}
}

class State {
	static fromJson(json) {
		const state = new this();
		state.states = {
			PROCESSING: LifecycleState.fromJson(json.states.PROCESSING),
			DELIVERING: LifecycleState.fromJson(json.states.DELIVERING),
			PARTITIONING: LifecycleState.fromJson(json.states.PARTITIONING)
		};
		state.diagnostics = [];
		for(let i = 0; i < json.diagnostics.length; i++) {
			state.diagnostics.push(Diagnostic.fromJson(
				json.diagnostics[i]));
		}
		return state;
	}
	_itemCounter(property) {
		let items = 0;
		for(let state in this.states) {
			if(this.states.hasOwnProperty(state)) {
				items += this.states[state][property];
			}
		}
		return items;
	}
	failedItems() {
		return this._itemCounter("failed");
	}
	ignoredItems() {
		return this._itemCounter("ignored");
	}
}

State.LIFECYCLE = {
	PARTITIONING: "PARTITIONING",
	PROCESSING: "PROCESSING",
	DELIVERING: "DELIVERING",
	DONE: "DONE"
};

export default State;
