import State from "./State.js";

class ItemState extends State {
	status() {
		if(!this.phaseIsDoneWithoutFailures(State.LIFECYCLE.PROCESSING))
			return State.LIFECYCLE.PROCESSING;
		else if(!this.phaseIsDoneWithoutFailures(State.LIFECYCLE.DELIVERING))
			return State.LIFECYCLE.DELIVERING;
		else if(this.allPhasesDone())
			return State.LIFECYCLE.DONE;
		return State.LIFECYCLE.PARTITIONING;
	}
	allPhasesDone() {
		for(let phase in this.states) {
			if(this.states.hasOwnProperty(phase) &&
					this.states[phase].endDate === null) {
				return false;
			}
		}
		return true;
	}
	phaseIsDoneWithoutFailures(phase) {
		return (this.states[phase].endDate !== null &&
			this.states[phase].failed === 0);
	}
}

export default ItemState
