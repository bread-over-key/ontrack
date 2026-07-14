"use client"
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function NarBar() {
	const pathname = usePathname()

	console.log("pathanme ", pathname)
	const value = useMemo(() => {
		if (pathname == "/")
			return 0;

		if (pathname == "/goals")
			return 1;
		return 0
	}, [pathname])

	return <BottomNavigation
		showLabels
		value={value}
	>
		<BottomNavigationAction
			label="home"
			LinkComponent={Link}
			href="/"
		>
		</BottomNavigationAction>

		<BottomNavigationAction
			label="list"
			LinkComponent={Link}
			href="/goals"
		>
		</BottomNavigationAction>
	</BottomNavigation>

}
