import React from "react";

import DateFilter from "./DateFilter";

class Filters extends React.Component {
	filternameToComponent(filtername, index) {
		switch(filtername) {
		case Filters.FILTER_TYPES.date:
			return (
				<DateFilter key={index} callback={() => console.warn("no-op callback")}/>
			);
		default:
			console.error(`unknown filter type ${filtername}`);
		}
	}
	render() {
		return (
			<div>
				{this.props.filters.map((filter, index) => this.filternameToComponent(filter, index))}
			</div>
		);
	}
}

Filters.FILTER_TYPES = {
	date: "date"
};

export default Filters;
