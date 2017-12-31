export const flowBinders = (state = [], action) => {
	switch(action.type) {
	case ACTION_TYPES.ADD_FLOWBINDERS:
		return state.concat(action.flowBinders);
	case ACTION_TYPES.UPDATE_FLOWBINDER:
		return state.map(f =>
			f.id === action.flowBinder.id ? action.flowBinder : f
		);
	default:
		return state;
	}
};

export const submitters = (state = new Map(), action) => {
	switch(action.type) {
	case ACTION_TYPES.ADD_SUBMITTER:
		const submitters = new Map(state);
		if(!submitters.has(action.id)) {
			submitters.set(action.id, [
				action.submitter
			]);
		} else {
			if(submitters.get(action.id).map(s => s.id).indexOf(
					action.submitter.id) === -1) {
				submitters.get(action.id).push(action.submitter);
			}
		}
		return submitters;
	default:
		return state;
	}
};

export const addFlowBinders = (flowBinders) => (
	{
		type: ACTION_TYPES.ADD_FLOWBINDERS,
		flowBinders: flowBinders
	}
);

export const updateFlowbinder = (flowBinder) => (
	{
		type: ACTION_TYPES.UPDATE_FLOWBINDER,
		flowBinder: flowBinder
	}
);

export const addSubmitter = (submitter, flowbinderId) => (
	{
		type: ACTION_TYPES.ADD_SUBMITTER,
		id: flowbinderId,
		submitter: submitter
	}
);

const ACTION_TYPES = {
	ADD_FLOWBINDERS: "ADD_FLOWBINDERS",
	ADD_SUBMITTER: "ADD_SUBMITTER",
	UPDATE_FLOWBINDER: "UPDATE_FLOWBINDER"
};
Object.freeze(ACTION_TYPES);
export {ACTION_TYPES};

export const initialState = {
	flowBinders: [],
	submitters: new Map()
};
