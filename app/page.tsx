"use server"

import GoalDetailList from "@/components/goal-detail-list";
import { getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { Container } from "@mui/material";
import { refresh } from "next/cache";

export default async function Home() {

	const goalDtoList: GoalDto[] = (await getAll()).filter(x => !x.archived);
	const currentDate = new Date()

	async function handleRefresh() {

		"use server"

		refresh()

	}

	return <Container>
		<GoalDetailList
			goals={goalDtoList}
			handleRefresh={handleRefresh}
			currentDate={currentDate}
		/>
	</Container>

}
