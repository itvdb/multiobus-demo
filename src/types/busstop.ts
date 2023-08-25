export default interface IBusstop {
	identifier: string;
	description: string;
	accessible: boolean;
	publicStop: boolean;
	itinerarySpot: number;
	types: Array<string>;
}
