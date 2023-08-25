export default interface IFile {
	identifier: string;
	file: string;
	/**
	 * date yyyy-MM-dd
	 */
	lastModified: string;
	contentType: "application/pdf" | string;
	/**
	 * blob?
	 */
	data: any;
	language: string; // Dutch
	audience: string; // Driver
	reportType: string;
	fileFormat: string; // PDF
	newEndDate: string; // written boolean??
}
