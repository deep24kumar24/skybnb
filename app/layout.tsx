import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";

const font = localFont({ src: "../public/fonts/Gilroy-Regular.ttf" });

export const metadata: Metadata = {
	title: "Skybnb",
	description: "Clone of Skybnb",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();
	return (
		<html lang="en">
			<body className={`${font.className} bg-slate-50`}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<Navbar currentUser={currentUser} />

				<div className="pb-20 pt-28">{children}</div>
			</body>
		</html>
	);
}
