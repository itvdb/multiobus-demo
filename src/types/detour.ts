import IAttachment from "./attachment";
import IBusstop from "./busstop";
import IInterval from "./interval";
import IMessage from "./message";
import IRoute from "./route";

export default interface IDetour {
	identifier: string;
	description: string;
	modifiedOn: string; // formatted date -> luxon
	routes: Array<IRoute>;
	impactedRoutes: Array<IRoute>;
}

export interface IDetourFull {
	identifier: string;
	description: string;
	modifiedOn: string;
	impactOnPath: string;
	routes: Array<IRoute>;
	attachments: Array<IAttachment>;
	messages: Array<IMessage>;
	stops: Array<IBusstop>;
	intervals: Array<IInterval>;
	impactedRoutes: Array<IRoute>;
}
