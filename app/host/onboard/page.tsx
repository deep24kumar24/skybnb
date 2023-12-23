"use client";
import Button from "@/app/components/Button";
import Container from "@/app/components/Container";
import { FaCheck } from "react-icons/fa";
import React from "react";
import { useRouter } from "next/navigation";

const perks = [
	"Enhanced Ad Filters",
	"History of Tenants",
	"Invoice for Tenants",
	"Cleaning reminders to tenants",
	"Garbage reminders to tenants",
];

const Onboard = () => {
	const router = useRouter();
	return (
		<Container>
			<div className="text-center mb-16">
				<h1 className="font-bold text-6xl py-12">Manage your rental with us</h1>

				<div className="w-40 mx-auto">
					<Button
						label="Get Started"
						onClick={() => router.push("createlisting")}
					/>
				</div>
			</div>

			<hr className="py-10" />

			<div className="max-w-[1200px] mx-auto">
				<h2 className="text-4xl pb-10 text-center">
					Manage your rental with modern features
				</h2>
				<table className="w-full">
					{perks.map((perk) => {
						return (
							<tr
								key={perk}
								className="border-b-slate-300 border-b-[1px]">
								<td className="p-6 font-bold text-2xl">{perk}</td>
								<td className="p-6">
									<FaCheck className="text-green-600" />
								</td>
							</tr>
						);
					})}
				</table>
			</div>
		</Container>
	);
};

export default Onboard;
