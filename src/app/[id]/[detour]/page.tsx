import DocumentDownload from "@/components/documentDownload";
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
		<Navigation current="events" name="Events">
			<>
				<h2 className="text-sm font-medium text-gray-500">{`${params.detour} - ${detour.modifiedOn} - ${detour.description}`}</h2>
				<h3 className="text-lg py-4">
					<Link href="/" className="text-indigo-500 hover:underline">
						Events
					</Link>
					{" > "}
					<Link href={`/${params.id}`} className="text-indigo-500  hover:underline">
						{params.id}
					</Link>
					{" > "}
					<span>Detour {params.detour}</span>
				</h3>
				<div className="md:mx-auto mx-10">
					{/* TODO: As much information of the detour pls */}
					<p className="border-b">
						{
							detour.messages
								.filter((m) => m.language === "NL" && m.audience === "Driver")
								.at(0)?.message
						}
					</p>
					<div className="grid lg:grid-cols-3 gap-2 py-2">
						{detour.attachments?.map((d: IAttachment) => (
							// <Link
							// 	key={d.identifier}
							// 	href={`/${params.id}/${params.detour}/${d.identifier}`}
							// 	className="shadow p-3 rounded border border-indigo-300 hover:shadow-indigo-300 flex flex-row space-x-2"
							// >
							// 	<svg
							// 		xmlns="http://www.w3.org/2000/svg"
							// 		fill="none"
							// 		viewBox="0 0 24 24"
							// 		stroke-width=".75"
							// 		stroke="currentColor"
							// 		className="w-12 h-12 xs:hidden text-indigo-500"
							// 	>
							// 		<path
							// 			stroke-linecap="round"
							// 			stroke-linejoin="round"
							// 			d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							// 		/>
							// 	</svg>
							// 	<div>
							// 		<p>
							// 			{d.identifier}{" "}
							// 			<span className="text-sm text-gray-500">
							// 				{d.lastModified}
							// 			</span>
							// 		</p>
							// 	</div>
							// </Link>
							<DocumentDownload
								key={d.identifier}
								id={params.id}
								detour={params.detour}
								attachment={d.identifier}
							/>
						))}
					</div>
				</div>
			</>
		</Navigation>
	);
}
