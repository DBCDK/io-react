import React from "react";

import Constants from "../Constants";
import BaseList from "../model/BaseList";
import Item from "../model/Item";
import ItemInfo from "./ItemInfo";
import Listener from "../Listener";
import Pager from "./Pager";

class CurrentItemListener extends Listener {
	onCurrentItemChanged(item) {
		for(let i = 0; i < this.listeners.length; i++) {
			this.listeners[i].onCurrentItemChanged(item);
		}
	}
}

class ItemElement extends React.Component {
	constructor(props) {
		super(props);
	}
	onClick({target}) {
		this.props.currentItemListener.onCurrentItemChanged(this.props.item);
	}
	render() {
		const id = (this.props.item.recordInfo !== null ?
			this.props.item.recordInfo.id : "");
		return (
			<tr onClick={this.onClick.bind(this)}>
				<td>{this.props.item.itemNumber}</td>
				<td>{id}</td>
				<td>{this.props.item.state.status()}</td>
			</tr>
		)
	}
}

class JobInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentItemListener: new CurrentItemListener()
		};
		Object.assign(this.state, BaseList.getBaseListStateObject());
	}
	componentWillMount() {
		BaseList.getItemsCount(Constants.itemsCountEndpoint,
				this.props.match.params.jobId, json => {
			this.setState({count: parseInt(json)});
			this.updateItemList();
		});
	}
	onBackClicked() {
		if(this.state.offset >= this.state.limit) {
			this.state.offset -= this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateItemList();
		}
	}
	onForwardClicked() {
		if((this.state.offset + this.state.limit) < this.state.count) {
			this.state.offset += this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateItemList();
		}
	}
	onBeginningClicked() {
		this.state.offset = 0;
		this.setState({offset: this.state.offset});
		this.updateItemList();
	}
	onEndClicked() {
		if((this.state.offset + this.state.limit) < this.state.count) {
			this.state.offset = this.state.count - this.state.limit;
			this.setState({offset: this.state.offset});
			this.updateItemList();
		}
	}
	updateItemList() {
		BaseList.getItems(Constants.itemsListEndpoint,
				this.props.match.params.jobId, this.state.limit,
				this.state.offset, json => {
			this.setState({items: BaseList.mapItemsFromJson(Item, json)});
			if(this.state.items.length > 0) {
				this.state.currentItemListener.onCurrentItemChanged(this.state.items[0]);
			}
		});
	}
	render() {
		return (
			<div>
				{/*match contains path params*/}
				<h1>job: {this.props.match.params.jobId}</h1>
				<Pager pos={this.state.offset} interval={this.state.limit} total={this.state.count} onBackClicked={this.onBackClicked.bind(this)} onForwardClicked={this.onForwardClicked.bind(this)} onBeginningClicked={this.onBeginningClicked.bind(this)} onEndClicked={this.onEndClicked.bind(this)}/>
				<div id="items-list">
					<table className="table">
						<thead>
							<tr>
								<th>number</th>
								<th>id</th>
								<th>status</th>
							</tr>
						</thead>
						<tbody>
						{
							this.state.items.map((item, i) => <ItemElement key={i} currentItemListener={this.state.currentItemListener} item={item} />)
						}
						</tbody>
					</table>
				</div>
				<div id="item-info">
					<ItemInfo currentItemListener={this.state.currentItemListener}/>
				</div>
			</div>
		);
	}
}

export default JobInfo;
