"use server"
import GoalDetailList from "@/components/goal-detail-list";
import GoalDetails from "@/components/goal-details";
import { getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { Container, List, Typography } from "@mui/material";
import Image from "next/image";
import { refresh } from 'next/cache'

export default async function Home() {

	const goals: GoalDto[] = (await getAll()).filter(x => !x.archived);

	async function handleRefresh(){

		"use server"

		refresh()

	}

	return (
		<Container>
			<GoalDetailList
				goals={goals}
				handleRefresh={handleRefresh}
			/>
		</Container>
	);
}
