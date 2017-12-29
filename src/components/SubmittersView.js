import React from "react";

class SubmittersView extends React.Component {
	render() {
		return (
			<div className="form-group">
				<label htmlFor="submitters">submitters</label>
				<select multiple>
					{this.props.submitters.map((submitter, index) => <option key={index} value={submitter.id}>{submitter.toString()}</option>)}
				</select>
			</div>
		)
	}
}

export default SubmittersView;
