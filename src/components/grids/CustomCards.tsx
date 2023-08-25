import INetworkEvent from "@/types/networkevent";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface ISimpleCards {
	identifier: string;
	title: string;
	link: string;
	description: string;
	modifiedOn: string;
}

export default function CustomCards({ data }: { data: Array<ISimpleCards> }) {
	return (
		<div>
			<ul
				role="list"
				className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
			>
				{data.map((project) => (
					<li
						key={project.identifier}
						className="font-medium text-gray-900 hover:text-gray-600 col-span-1 flex rounded-md shadow-sm hover:shadow"
					>
						<Link
							href={project.link}
							className="flex flex-1 items-center justify-between truncate rounded border border-gray-200 bg-white"
						>
							<div className="flex-1 truncate px-4 py-2 text-sm">
								<p>
									{project.title}
									<span className="font-normal"> - </span>
									<span className="font-normal text-gray-400">
										{project.modifiedOn}
									</span>
								</p>
								<p className="font-normal">{project.description}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
