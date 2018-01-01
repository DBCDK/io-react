import React from "react";
import PropTypes from "prop-types";

class SubmittersView extends React.Component {
	render() {
		const storeState = this.context.store.getState();
		let submitters = [];
		if(this.props.flowBinderId !== undefined && storeState.submitters.has(
				this.props.flowBinderId)) {
			submitters = storeState.submitters.get(this.props.flowBinderId);
		}
		return (
			<div className="form-group">
				{this.props.withLabel ? <label htmlFor="submitters">submitters</label> : <noop/>}
				<select multiple name="submitters">
					{submitters.map((submitter, index) => <option key={index} value={submitter.id}>{submitter.toString()}</option>)}
				</select>
			</div>
		)
	}
}

SubmittersView.propTypes = {
	withLabel: PropTypes.bool
};

SubmittersView.defaultProps = {
	withLabel: false
};

SubmittersView.contextTypes = {
	store: PropTypes.object.isRequired
};

export default SubmittersView;
