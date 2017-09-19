import React from "react";

class Pager extends React.Component {
	constructor(props) {
		super(props);
	}
	onBackClicked() {
		this.props.onBackClicked();
	}
	onForwardClicked() {
		this.props.onForwardClicked();
	}
	onBeginningClicked() {
		this.props.onBeginningClicked();
	}
	onEndClicked() {
		this.props.onEndClicked();
	}
	render() {
		const pos = parseInt(this.props.pos);
		const total = parseInt(this.props.total);
		// to display the correct 1-indexed position
		const displayPos = total > 0 ? pos + 1 : 0;
		let upperBoundary = pos + parseInt(this.props.interval);
		if(upperBoundary > total) {
			upperBoundary = total;
		}
		return (
			<div>
				<ul className="list-inline">
					<li onClick={this.onBeginningClicked.bind(this)}><button>🐌</button></li>
					<li onClick={this.onBackClicked.bind(this)}><button>👈</button></li>
					<li>{displayPos}-{upperBoundary} of {total}</li>
					<li onClick={this.onForwardClicked.bind(this)}><button>👉</button></li>
					<li onClick={this.onEndClicked.bind(this)}><button>🐳</button></li>
				</ul>
			</div>
		)
	}
}

export default Pager;
