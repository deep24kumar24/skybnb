import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Airbnb Clone",
	description: "Clone of Airbnb",
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
				<Navbar currentUser={currentUser} />
				{children}
			</body>
		</html>
	);
}
