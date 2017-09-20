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
		return js.map(item => type.fromJson(item));
	}
}

export default BaseList;
