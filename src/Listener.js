class Listener {
	constructor() {
		this.listeners = [];
	}
	addListener(listener) {
		this.listeners.push(listener);
	}
}

export default Listener;
