import React from "react";
import PropTypes from "prop-types";

class DateFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ""};
	}
	getValue() {
		// TODO: return as query
		return this.state.value;
	}
	sendCallback() {
		this.props.callback(this.getValue());
	}
	onChange(event) {
		this.setState({value: event.target.value});
	}
	onBlur() {
		this.sendCallback();
	}
	onKeyPress(event) {
		// enter pressed
		if(event.charCode === 13) {
			this.sendCallback();
		}
	}
	render() {
		/* validate input like "2017-10-01", "NOT 2017-10-01", "2017-09-28 - 2017-10-01" */
		return (
			<input type="text" inputMode="numeric" name="datefilter" pattern="(?: *NOT +)?\d{4}-?\d{2}-?\d{2}(?: *- *\d{4}-?\d{2}-?\d{2})?" onBlur={this.onBlur.bind(this)} onKeyPress={this.onKeyPress.bind(this)} onChange={this.onChange.bind(this)}/>
		)
	}
}

DateFilter.propTypes = {
	callback: PropTypes.func.isRequired
};

export default DateFilter;
