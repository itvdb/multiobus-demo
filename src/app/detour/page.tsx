import SimpleCards from "@/components/grids/SimpleCards";
import Navigation from "@/components/navigation";
import IDetour from "@/types/detour";
import { DateTime } from "luxon";

async function loadDisruptions(): Promise<Array<IDetour>> {
	const httpHeaders = {
		"Ocp-Apim-Subscription-Key": "5257bd9d29a841f28fa9768ffffa0b74",
	};
	const myHeaders = new Headers(httpHeaders);
	const response = await fetch(`https://api.delijn.be/storingen-api/v1/networkevents`, {
		headers: myHeaders,
		cache: "no-cache",
	});
	let data = await response.json();
	console.log(data);
	data = data.filter((a: any) => {
		if (a.status === "Active") return true;
		// if (a.modifiedOn >= DateTime.now().toFormat("yyyy-MM-dd")) return true;
		return false;
	});
	return data;
}

export default async function Dashboard() {
	const disruptions = await loadDisruptions();

	return (
		<Navigation current="detours">
			<p>Detours</p>
		</Navigation>
	);
}
