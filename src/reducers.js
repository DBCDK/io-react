export const submitters = (state = initialState, action) => {
	switch(action.type) {
	case ACTION_TYPES.ADD_SUBMITTER:
		const submitters = new Map(state.submitters);
		if(!submitters.has(action.id)) {
			submitters.set(action.id, [
				action.submitter
			]);
		} else {
			submitters.get(action.id).push(action.submitter);
		}
		return Object.assign({}, state, {
			submitters: submitters
		});
	default:
		console.warn(`unknown action: ${action.toSource()}`);
		return state;
	}
};

export const addSubmitter = (submitter, flowbinderId) => (
	{
		type: ACTION_TYPES.ADD_SUBMITTER,
		id: flowbinderId,
		submitter: submitter
	}
);

const ACTION_TYPES = {
	ADD_SUBMITTER: "ADD_SUBMITTER"
};
Object.freeze(ACTION_TYPES);
export {ACTION_TYPES};

export const initialState = {
	submitters: new Map()
};
