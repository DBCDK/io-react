class Diagnostic {
	static fromJson(json) {
		const diagnostic = new this();
		diagnostic.level = json.level;
		diagnostic.message = json.message;
		diagnostic.stacktrace = json.stacktrace;
		// TODO: should we map tag and attribute also?
		return diagnostic;
	}
}

export default Diagnostic;
