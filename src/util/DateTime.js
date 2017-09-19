class DateTime {
	static strDateFromMillis(millis) {
		/*
		 * invoking Date as a function (without `new`) makes it
		 * return a string representation of the current time
		 * regardless of input - so don't do that
		 */
		const date = new Date();
		date.setTime(millis);
		// temporary version without timezone handling
		return date.toUTCString();
	}
}

export default DateTime;
