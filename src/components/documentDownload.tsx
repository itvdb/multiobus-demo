import IFile from "@/types/file";
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

export default async function DocumentDownload({
	...props
}: {
	id: string;
	detour: string;
	attachment: string;
}) {
	const attachment: IFile = await loadData({ ...props });
	return (
		<Link
			href={`data:application/pdf;base64,${attachment.data}`}
			download={attachment.file}
			target="_blank"
			className="border shadow rounded bg-indigo-500 text-white px-2 py-2 w-full hover:shadow-lg hover:bg-indigo-600 text-center"
		>
			{`Download ${attachment.file}`}
		</Link>
	);
}
