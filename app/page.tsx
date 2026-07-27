"use server"

import GoalDetailList from "@/components/goal-detail-list";
import { differenceInDays, findLastDate } from "@/lib/date-compare";
import { getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { Container } from "@mui/material";
import { refresh } from "next/cache";

export default async function Home() {

	let goalDtoList: GoalDto[] = (await getAll()).filter(x => !x.archived);
	const currentDate = new Date()


	goalDtoList.map(goal => {
		const entryDates: Date[] =
			goal.entries.map(
				x => x.date
			)
		const lastDate =
			findLastDate(currentDate, entryDates)

		if (lastDate) {

			const diff =
				differenceInDays(currentDate, lastDate)
			goal.waterRemaining = goal.waterDuration - diff
		}
		else {
			goal.waterRemaining = -1000;
		}
	})
	/*
		goalDtoList = 
			goalDtoList
				.sort(
					(x, y) => y.waterRemaining - x.waterRemaining)
	*/

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
