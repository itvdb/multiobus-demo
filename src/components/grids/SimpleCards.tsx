import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function SimpleCards({
	projects,
}: {
	projects: Array<{
		name: string;
		identifier?: string;
		href: string;
		messages?: Array<any>;
		modifiedOn: string;
		bgColor: string;
		type?: string;
	}>;
}) {
	return (
		<div>
			<h2 className="text-sm font-medium text-gray-500">Events</h2>
			<ul
				role="list"
				className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
			>
				{projects.map((project) => (
					<li key={project.name} className="col-span-1 flex rounded-md shadow-sm">
						<div
							className={classNames(
								project.bgColor,
								"flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white"
							)}
						>
							{project.type}
						</div>
						<div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
							<div className="flex-1 truncate px-4 py-2 text-sm">
								<Link
									href={project.href}
									className="font-medium text-gray-900 hover:text-gray-600"
								>
									{project.identifier}
								</Link>
								<p className="text-gray-400">{project.modifiedOn}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
