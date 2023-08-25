import IDetour from "./detour";
import IInterval from "./interval";
import INote from "./note";

export default interface INetworkEvent {
	identifier: string;
	type: string;
	status: string;
	site: string;
	confirmationEdDate: boolean;
	modifiedOn: string; // formatted date -> luxon
	detours: Array<IDetour>;
	divisions: Array<{ identifier: string }>;
	garages: Array<{ id: string }>;
	intervals: Array<IInterval>;
	notes: Array<INote>;

	/**
	 * CUSTOM ADDED
	 * on page so only used in one place
	 */
	bgColor?: string;
	/**
	 * CUSTOM ADDED
	 * on page so only used in one place
	 */
	href?: string;
}
