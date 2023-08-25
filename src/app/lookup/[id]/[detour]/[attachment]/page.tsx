import Navigation from "@/components/navigation";
import IAttachment from "@/types/attachment";
import IFile from "@/types/file";
import { DateTime } from "luxon";
import Link from "next/link";

async function loadData({
	id,
	detour,
	attachment,
}: {
	id: string;
	detour: string;
	attachment: string;
}): Promise<IFile> {
	const httpHeaders = {
		"Ocp-Apim-Subscription-Key": "5257bd9d29a841f28fa9768ffffa0b74",
	};
	const myHeaders = new Headers(httpHeaders);
	const myURL = `https://api.delijn.be/storingen-api/v1/networkevents/${id}/detours/${detour}/attachments/${attachment}`;
	const response = await fetch(myURL, {
		headers: myHeaders,
	});
	let data: IFile = await response.json();
	return data;
}

export default async function Dashboard({
	params,
}: {
	params: { id: string; detour: string; attachment: string };
}) {
	const attachment: IFile = await loadData({
		id: params.id,
		detour: params.detour,
		attachment: params.attachment,
	});

	return (
		<Navigation current="events" name="Attachment">
			<>
				<h2 className="text-sm font-medium text-gray-500">{`${attachment.identifier} - ${attachment.lastModified} - ${attachment.file}`}</h2>
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
					<span>
						Detour{" "}
						<Link
							href={`/lookup/${params.id}/${params.detour}`}
							className="text-indigo-500 font-bold hover:underline"
						>
							{params.detour}
						</Link>{" "}
					</span>
					{" > "}
					<span>Attachment {params.attachment}</span>
				</h1>
				<div className="flex flex-col max-w-5xl md:mx-auto mx-10">
					<Link
						href={`data:application/pdf;base64,${attachment.data}`}
						download={attachment.file}
						className="border shadow rounded bg-indigo-500 text-white px-2 py-2 w-min hover:shadow-lg hover:bg-indigo-600"
					>
						Download
					</Link>
				</div>
			</>
		</Navigation>
	);
}
