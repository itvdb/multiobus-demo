"use client";
import Image from "next/image";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const user = {
	name: "Tom Cook",
	email: "tom@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
	{ name: "Events", href: "/", canonical: "events" },
	{ name: "Detours", href: "/detours", canonical: "detours" },
	// { name: "Team", href: "/team", canonical: "team" },
	// { name: "Projects", href: "/projects", canonical: "projects" },
	// { name: "Calendar", href: "/calendar", canonical: "calendar" },
];
const userNavigation = [
	{ name: "Your Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Navigation({
	children,
	current,
	name,
}: {
	children: JSX.Element;
	current: "events" | "detours";
	name?: string;
}) {
	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
			<div className="min-h-full">
				<Disclosure as="nav" className="border-b border-gray-200 bg-white">
					{({ open }) => (
						<>
							<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
								<div className="flex h-16 justify-between">
									<div className="flex">
										<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
											{navigation.map((item) => (
												<Link
													key={item.name}
													href={item.href}
													className={classNames(
														item.canonical == current
															? "border-indigo-500 text-gray-900"
															: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
														"inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
													)}
													aria-current={
														item.canonical == current
															? "page"
															: undefined
													}
												>
													{item.name}
												</Link>
											))}
										</div>
									</div>
									<div className="-mr-2 flex items-center sm:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
											<span className="absolute -inset-0.5" />
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<Bars3Icon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="sm:hidden">
								<div className="space-y-1 pb-3 pt-2">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.canonical == current
													? "border-indigo-500 bg-indigo-50 text-indigo-700"
													: "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
												"block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
											)}
											aria-current={
												item.canonical == current ? "page" : undefined
											}
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>

				<div className="py-10">
					<header>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
								{name ? name : navigation.find((a) => a.canonical == current)?.name}
							</h1>
						</div>
					</header>
					<main>
						<div className="mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
							{/* Your content */}
							{children}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
