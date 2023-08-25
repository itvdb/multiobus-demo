import CustomCards from "@/components/grids/CustomCards";
import SimpleCards from "@/components/grids/SimpleCards";
import Navigation from "@/components/navigation";
import IDetour from "@/types/detour";
import INetworkEvent from "@/types/networkevent";
import { DateTime } from "luxon";
import Link from "next/link";

interface IDetourCustom extends IDetour {
	eventCode: string;
}

async function loadData(): Promise<Array<IDetourCustom>> {
	const httpHeaders = {
		"Ocp-Apim-Subscription-Key": "5257bd9d29a841f28fa9768ffffa0b74",
	};
	const myHeaders = new Headers(httpHeaders);
	const response = await fetch(`https://api.delijn.be/storingen-api/v1/networkevents`, {
		headers: myHeaders,
		cache: "no-cache",
	});
	let data: Array<INetworkEvent> = await response.json();
	data = data.filter((a: INetworkEvent) => a.status === "Active" && a.detours.length);
	let list: Array<IDetourCustom> = [];
	data.map((ne) => ne.detours.map((dt) => list.push({ eventCode: ne.identifier, ...dt })));
	return list;
}

export default async function Dashboard() {
	const data: Array<IDetourCustom> = await loadData();
	const filteredData: Array<{
		identifier: string;
		title: string;
		description: string;
		modifiedOn: string;
		link: string;
	}> = data.map((d) => ({
		identifier: d.identifier,
		title: d.identifier,
		description: d.description,
		modifiedOn: d.modifiedOn,
		link: `/${d.eventCode}/${d.identifier}`,
	}));

	return (
		<Navigation current="detours">
			<CustomCards data={filteredData} />
			{/* <div className="grid grid-cols-4 gap-2 max-w-5xl md:mx-auto mx-10">
				{data.map((dt) => (
					<Link
						href={`/${dt.eventCode}/${dt.identifier}`}
						key={dt.identifier}
						className="shadow p-3 rounded border border-indigo-300 hover:shadow-indigo-300"
					>
						<p>{`${dt.identifier} - ${dt.modifiedOn}`}</p>
						<p>{dt.description}</p>
					</Link>
				))}
			</div> */}
		</Navigation>
	);
}
