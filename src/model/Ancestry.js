class Ancestry {
	static fromJson(json) {
		/*
		 * to enable inheriting this method properly, use `new this()`
		 * otherwise, if the object is instantiated as new Ancestry()
		 * the object returned by an inheriting class will be an instance
		 * of the parent class rather than an instance of the inherting class
		 */
		const ancestry = new this();
		this.harvesterToken = json.harvesterToken;
		this.previousJobId = json.previousJobId;
		return ancestry;
	}
}

export default Ancestry;
