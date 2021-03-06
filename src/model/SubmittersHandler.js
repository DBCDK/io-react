import BaseList from "./BaseList";
import Constants from "../Constants";
import HttpClient from "../HttpClient";
import Submitter from "./Submitter";

class SubmittersHandler {
	constructor(submittersCache) {
		if(submittersCache === undefined) {
			this.submittersCache = new Map();
		} else {
			this.submittersCache = submittersCache;
		}
	}
	getSubmitter(submitterId) {
		return new Promise((resolve, reject) => {
			if(this.submittersCache.has(submitterId)) {
				resolve(this.submittersCache.get(submitterId));
			} else {
				const params = new Map();
				params.set("submitterId", submitterId);
				BaseList.getSingleItem(Constants.submitterEndpoint, params).then(
						jsonStr => {
					const json = JSON.parse(jsonStr);
					const submitter = Submitter.fromJson(json);
					this.submittersCache.set(submitterId, submitter);
					resolve(submitter);
				}).catch(err => reject(err));
			}
		});
	}
	getSubmitters() {
		return new Promise((resolve, reject) => {
			new HttpClient().get(Constants.submittersEndpoint).then(jsonStr => {
				const json = JSON.parse(jsonStr);
				resolve(json.map(item => Submitter.fromJson(item)));
			}).catch(err => reject(err));
		});
	}
}

export default SubmittersHandler;
