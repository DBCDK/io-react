import Ancestry from "./Ancestry";

class JobSpecification {
	static fromJson(json) {
		const specification = new this();
		specification.packaging = json.packaging;
		specification.format = json.format;
		specification.charset = json.charset;
		specification.destination = json.destination;
		specification.submitterId = json.submitterId;
		specification.mailForNotificationAboutVerification =
			json.mailForNotificationAboutVerification;
		specification.mailForNotificationAboutProcessing =
			json.mailForNotificationAboutProcessing;
		specification.dataFile = json.dataFile;
		specification.type = json.type;
		specification.ancestry = null;
		if(json.ancestry !== undefined) {
			specification.ancestry = Ancestry.fromJson(
				json.ancestry);
		}
		return specification;
	}
}

export default JobSpecification;
