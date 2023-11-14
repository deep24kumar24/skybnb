"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const Logo = () => {
    const router = useRouter();
    return (
        <Image
            height={100}
            width={100}
            className="hidden md:block cursor-pointer"
            alt="Logo"
            src="/images/logo.png" />
    )
}

export default Logo