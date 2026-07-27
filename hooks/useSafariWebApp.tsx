"use client"

import { useState, useEffect } from "react";

export default function useSafariWebApp() {
	const [isIOSWebApp, setIsIOSWebApp] = useState(false);

	useEffect(() => {
		setIsIOSWebApp(
			(window.navigator as Navigator & { standalone?: boolean }).standalone === true
		);
	}, []);


	useEffect(() => {

		const updateOverflow = () => {

			document.documentElement
				.style.setProperty(

					"--overflow",
					"hidden"

				)

		}

		if (isIOSWebApp) {

			updateOverflow();

		}

	}, [isIOSWebApp])

	return {
	};
}
