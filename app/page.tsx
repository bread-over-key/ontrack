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
			console.log("===== ")
			console.log("goal ", goal.name)

		const entryDates: Date[] =
			goal.entries.map(
				x => x.date
			)
		const lastDate =
			findLastDate(currentDate, entryDates)

		console.log("last date ", lastDate)
		if (lastDate) {

			const diff =
				differenceInDays(currentDate, lastDate)
			goal.waterRemaining = goal.waterDuration - diff
			console.log("diff ", diff)
			console.log("duration ", goal.waterDuration)
			console.log("offset by 1 ")
			console.log("waater remaining ", goal.waterRemaining)
		}
		else {
			goal.waterRemaining = -1000;
			console.log("waater remaining ", goal.waterRemaining)
		}
			console.log("===== ")
	})

	goalDtoList = goalDtoList.sort((x, y) => y.waterRemaining - x.waterRemaining)

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
