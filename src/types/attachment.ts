export default interface IAttachment {
	identifier: string;
	file: string;
	/**
	 * yyyy-MM-dd
	 */
	lastModified: string;
	audience?: "Driver" | "PUBLIC" | string;
}
