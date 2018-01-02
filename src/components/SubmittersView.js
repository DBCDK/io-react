import React from "react";
import PropTypes from "prop-types";

class SubmittersView extends React.Component {
	render() {
		const allSubmitters = this.context.store.getState().submitters;
		const submitters = allSubmitters.filter(submitter =>
			this.props.submitterIds.indexOf(submitter.id) !== -1);
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
