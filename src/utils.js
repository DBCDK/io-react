// a class to handle binding path params to values
class Path {
	constructor(path) {
		this.path = path;
	}
	bind(key, value) {
		this.path = this.path.replace(`:${key}`, value);
	}
}

export default Path;
