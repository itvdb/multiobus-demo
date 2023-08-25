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
	return data;
}

export default async function Dashboard({ params }: { params: { id: string; detour: string } }) {
	const detour: IDetourFull = await loadData({ id: params.id, detour: params.detour });

	return (
		<Navigation current="dashboard">
			<>
				<h1 className="text-lg py-4">
					<span>
						Event{" "}
						<a
							href={`/${params.id}`}
							className="text-red-500 font-bold hover:underline"
						>
							{params.id}
						</a>{" "}
					</span>
					{" > "}
					<span>Detour {params.detour}</span>
				</h1>
				<div className="flex flex-col max-w-5xl md:mx-auto mx-10">
					<h1>Detour {params.detour}</h1>
					<p>{detour.description}</p>
					<p>{detour.modifiedOn}</p>
					{detour.attachments?.map((d: IAttachment) => (
						<>
							<p>{`${d.lastModified} - ${d.audience}`}</p>
							<Link href={`/${params.id}/${params.detour}/${d.identifier}`}>
								{d.identifier}
							</Link>
						</>
					))}
				</div>
			</>
		</Navigation>
	);
}
