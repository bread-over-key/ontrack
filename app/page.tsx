"use server"
import { getAll } from "@/lib/services/goal-service";
import { Container, Typography } from "@mui/material";
import Image from "next/image";

export default async function Home() {

	const goals = await getAll();

	return (
		<Container>
			<Typography>On Trackk</Typography>
			{goals?.map(g => {

				return <div>{g.name}</div>

			})}
		</Container>
	);
}
