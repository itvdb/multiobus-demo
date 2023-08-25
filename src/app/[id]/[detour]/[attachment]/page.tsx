import Navigation from "@/components/navigation";
import IAttachment from "@/types/attachment";
import IFile from "@/types/file";
import { DateTime } from "luxon";

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
		<Navigation current="dashboard" name="Attachment">
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
					<span>
						Detour{" "}
						<a
							href={`/${params.id}/${params.detour}`}
							className="text-red-500 font-bold hover:underline"
						>
							{params.detour}
						</a>{" "}
					</span>
					{" > "}
					<span>Attachment {params.attachment}</span>
				</h1>
				<div className="flex flex-col max-w-5xl md:mx-auto mx-10">
					<a
						href={`data:application/pdf;base64,${attachment.data}`}
						download={attachment.file}
					>
						TEST
					</a>
				</div>
			</>
		</Navigation>
	);
}
