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

	return (
		<Navigation current="dashboard">
			<>
				<h1 className="text-lg py-4">
					<a href="/" className="text-red-500 font-bold hover:underline">
						Events
					</a>
				</h1>
				<div className="flex flex-col max-w-5xl md:mx-auto mx-10">
					<h1>Event {params.id}</h1>
					{events.detours.map((d: IDetour) => (
						<>
							<Link href={`/${params.id}/${d.identifier}`}>{d.identifier}</Link>
						</>
					))}
				</div>
			</>
		</Navigation>
	);
}
