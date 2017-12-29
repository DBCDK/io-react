import React from "react";
import PropTypes from "prop-types";

class SubmittersView extends React.Component {
	render() {
		return (
			<div className="form-group">
				{this.props.withLabel ? <label htmlFor="submitters">submitters</label> : <noop/>}
				<select multiple>
					{this.props.submitters.map((submitter, index) => <option key={index} value={submitter.id}>{submitter.toString()}</option>)}
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

export default SubmittersView;
