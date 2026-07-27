"use client"

import { Stack, Container, Typography, Box } from "@mui/material"
import NarBar from "./nav-bar"
import RootProviders from "./root-providers"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const version = "1.8"

export default function GlobalLayout(props: { children: React.ReactNode }) {
	return <AppRouterCacheProvider>
		<Stack sx={{ height: "100vh" }} >

			<Container
				sx={{
					p: "1%",
					borderBottomStyle: "solid",
					borderBottomColor: "#ddd",
					borderBottomWidth: "1pt"
				}}>
				<Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", pr: "3px" }}>
					<Typography variant="h5">🫐 On Track</Typography>
					<Typography color="textDisabled">v{version}</Typography>
				</Stack>
			</Container>
			<Container sx={{ flex: 1, mt: "10pt", maxHeight: "87vh" }} >
				<RootProviders>
					{props.children}
				</RootProviders>
			</Container>
			<Box >
				<NarBar />
			</Box>
		</Stack>
	</AppRouterCacheProvider>
}
