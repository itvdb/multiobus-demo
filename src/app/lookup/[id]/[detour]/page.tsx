import Navigation from "@/components/navigation";
import IAttachment from "@/types/attachment";
import { IDetourFull } from "@/types/detour";
import INetworkEvent from "@/types/networkevent";
import { DateTime } from "luxon";
import Link from "next/link";

async function loadData({ id, detour }: { id: string; detour: string }): Promise<IDetourFull> {
	const httpHeaders = {
		"Ocp-Apim-Subscription-Key": "5257bd9d29a841f28fa9768ffffa0b74",
	};
	const myHeaders = new Headers(httpHeaders);
	const response = await fetch(
		`https://api.delijn.be/storingen-api/v1/networkevents/${id}/detours/${detour}`,
		{
			headers: myHeaders,
		}
	);
	let data: IDetourFull = await response.json();
	data.attachments = data.attachments.filter((a) => a.audience === "Driver");
	return data;
}

export default async function Dashboard({ params }: { params: { id: string; detour: string } }) {
	const detour: IDetourFull = await loadData({ id: params.id, detour: params.detour });

	return (
		<Navigation current="events" name="Detour">
			<>
				<h2 className="text-sm font-medium text-gray-500">{`${params.detour} - ${detour.modifiedOn} - ${detour.description}`}</h2>
				<h1 className="text-lg py-4">
					<span>
						Event{" "}
						<Link
							href={`/lookup/${params.id}`}
							className="text-indigo-500 font-bold hover:underline"
						>
							{params.id}
						</Link>{" "}
					</span>
					{" > "}
					<span>Detour {params.detour}</span>
				</h1>
				<div className="max-w-5xl md:mx-auto mx-10">
					<div className="grid grid-cols-3 gap-2 ">
						{detour.attachments?.map((d: IAttachment) => (
							<Link
								key={d.identifier}
								href={`/lookup/${params.id}/${params.detour}/${d.identifier}`}
								className="shadow p-3 rounded border border-indigo-300 hover:shadow-indigo-300"
							>
								<p>{d.identifier}</p>
								<p>{`${d.lastModified} - ${d.audience}`}</p>
							</Link>
						))}
					</div>
				</div>
			</>
		</Navigation>
	);
}
