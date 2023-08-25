import CustomCards from "@/components/grids/CustomCards";
import Navigation from "@/components/navigation";
import IDetour from "@/types/detour";
import INetworkEvent from "@/types/networkevent";
import { DateTime } from "luxon";
import Link from "next/link";

async function loadDisruptions({ id }: { id: string }): Promise<INetworkEvent> {
	const httpHeaders = {
		"Ocp-Apim-Subscription-Key": "5257bd9d29a841f28fa9768ffffa0b74",
	};
	const myHeaders = new Headers(httpHeaders);
	const response = await fetch(`https://api.delijn.be/storingen-api/v1/networkevents/${id}`, {
		headers: myHeaders,
	});
	let data: INetworkEvent = await response.json();
	return data;
}

export default async function Dashboard({ params }: { params: { id: string } }) {
	const events = await loadDisruptions({ id: params.id });
	const filteredData = events.detours.map((d) => ({
		identifier: d.identifier,
		title: d.identifier,
		description: d.description,
		modifiedOn: d.modifiedOn,
		link: `/${params.id}/${d.identifier}`,
	}));

	return (
		<Navigation current="events" name="Event">
			<>
				<h2 className="text-sm font-medium text-gray-500">{params.id}</h2>
				<h1 className="text-lg py-4">
					<Link href="/" className="text-indigo-500 hover:underline">
						Events
					</Link>
					{" > "}
					{events.identifier}
				</h1>
				<p>{events.notes.find((n) => n.language === "NL")?.text}</p>
				<CustomCards data={filteredData} />
				{/* <div className="grid lg:grid-cols-3 gap-2 max-w-5xl md:mx-auto mx-8">
					{events.detours.map((d: IDetour) => (
						<Link
							href={`/${params.id}/${d.identifier}`}
							key={d.identifier}
							className="shadow px-3 py-5 rounded border border-indigo-300 hover:shadow-indigo-300"
						>
							<p>{d.identifier}</p>
							<p>{d.description}</p>
						</Link>
					))}
				</div> */}
			</>
		</Navigation>
	);
}
