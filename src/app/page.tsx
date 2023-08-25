import SimpleCards from "@/components/grids/SimpleCards";
import Navigation from "@/components/navigation";
import { DateTime } from "luxon";

async function loadDisruptions(): Promise<Array<any>> {
	const httpHeaders = {
		"Ocp-Apim-Subscription-Key": "5257bd9d29a841f28fa9768ffffa0b74",
	};
	const myHeaders = new Headers(httpHeaders);
	const response = await fetch(`https://api.delijn.be/storingen-api/v1/networkevents`, {
		headers: myHeaders,
		cache: "no-cache",
	});
	let data = await response.json();
	let list = data.filter((a: any) => {
		// if (a.status === "Active" && a.confirmationEndDate === false) return true;
		if (a.modifiedOn >= DateTime.now().toFormat("yyyy-MM-dd")) return true;
		return false;
	});
	data = list.map((d: any) => {
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
		<Navigation current="dashboard">
			<SimpleCards projects={disruptions} />
		</Navigation>
	);
}
