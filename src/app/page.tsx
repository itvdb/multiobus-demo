import SimpleCards from "@/components/grids/SimpleCards";
import Navigation from "@/components/navigation";
import INetworkEvent from "@/types/networkevent";
import { DateTime } from "luxon";

async function loadDisruptions(): Promise<Array<INetworkEvent>> {
	const httpHeaders = {
		"Ocp-Apim-Subscription-Key": "5257bd9d29a841f28fa9768ffffa0b74",
	};
	const myHeaders = new Headers(httpHeaders);
	const response = await fetch(`https://api.delijn.be/storingen-api/v1/networkevents`, {
		headers: myHeaders,
		cache: "no-cache",
	});
	let data: Array<INetworkEvent> = await response.json();
	let list = data.filter((a: INetworkEvent) => {
		if (a.status === "Active") return true;
		// if (a.modifiedOn >= DateTime.now().toFormat("yyyy-MM-dd")) return true;
		return false;
	});
	data = list.map((d: INetworkEvent) => {
		d.href = `/${d.identifier}`;
		switch (d.type) {
			case "Event":
				d.bgColor = "bg-green-500";
				break;
			case "Market":
				d.bgColor = "bg-yellow-500";
				break;
			case "Work":
				d.bgColor = "bg-blue-500";
				break;
			case "Others":
				d.bgColor = "bg-indigo-500";
				break;
			case "Festivity":
				d.bgColor = "bg-purple-500";
				break;
			case "Fair":
				d.bgColor = "bg-amber-500";
				break;
			case "Sport":
				d.bgColor = "bg-pink-500";

			default:
				d.bgColor = "bg-red-500";
				break;
		}
		return d;
	});
	return list;
}

export default async function Dashboard() {
	const disruptions = await loadDisruptions();

	return (
		<Navigation current="events">
			<SimpleCards projects={disruptions} />
		</Navigation>
	);
}
