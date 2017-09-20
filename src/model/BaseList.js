import React from "react";

import HttpClient from "../HttpClient";
import Path from "../utils";

class BaseList {
	static getBaseListStateObject() {
		return {
			items: [],
			count: 0,
			limit: 50,
			offset: 0
		};
	}
	static getItemsCount(endpoint, jobId, callback) {
		const path = new Path(endpoint);
		path.bind("jobId", jobId);
		new HttpClient().with_callback(callback)
			.get(path.path);
	}
	static getItems(endpoint, jobId, limit, offset, callback) {
		const path = new Path(endpoint);
		path.bind("jobId", jobId);
		new HttpClient().with_callback(callback)
			.withQuery({limit: limit, offset: offset})
			.get(path.path);
	}
	static mapItemsFromJson(type, itemListJson) {
		const js = JSON.parse(itemListJson);
		const items = [];
		for(let i = 0; i < js.length; i++) {
			const item = type.fromJson(js[i]);
			items.push(item);
		}
		return items;
	}
}

export default BaseList;
