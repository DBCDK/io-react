import React from "react";
import PropTypes from "prop-types";

import Filters from "./Filters";

class FilterView extends React.Component {
	constructor(props) {
		super(props);
		const filterOptions = Object.getOwnPropertyNames(Filters.FILTER_TYPES);
		this.state = {filterOptions: filterOptions, show: "hidden"};
	}
	onClick() {
		if(this.state.show === "hidden") {
			this.setState({show: "active"});
		} else {
			this.setState({show: "hidden"});
		}
	}
	onFilterSelected({target}) {
		this.setState({show: "hidden"});
		this.props.filters.push(target.value);
		target.value = "";
	}
	render() {
		return (
			<div>
				<input type="button" value="➕" onClick={this.onClick.bind(this)}/>
				<select className={this.state.show} onInput={this.onFilterSelected.bind(this)}>
					<option value=""/>
					{this.state.filterOptions.map((item, index) => <option key={index} value={item}>{item}</option>)}
				</select>
				<Filters filters={this.props.filters}/>
			</div>
		);
	}
}

FilterView.propTypes = {
	filters: PropTypes.array
};

FilterView.defaultProps = {
	filters: []
};

export default FilterView;
