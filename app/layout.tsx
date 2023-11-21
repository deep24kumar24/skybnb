import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import RentModal from "./components/Modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Skybnb",
	description: "Clone of Skybnb",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<RentModal />
				<Navbar currentUser={currentUser} />

				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
