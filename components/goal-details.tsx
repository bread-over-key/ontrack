import { addEntryAction, deleteEntryAction } from "@/app/actions/entry-actions";
import { differenceInDays, findLastDate, isSameDate } from "@/lib/date-compare";
import { recentEntries } from "@/lib/water";
import { EntryDto } from "@/types/EntryDto";
import { GoalDto } from "@/types/GoalDto";
import { ListItem, Stack, Chip, Typography, Box, Button, Divider } from "@mui/material";
import { type } from "os";
import { startTransition, useEffect, useMemo, useOptimistic, useTransition } from "react";
import EntryButton from "./entry-button";

export default function GoalDetails(props: {
	goal: GoalDto,
	date: Date
	showEntries: boolean
	showSort: boolean
}) {


	const [optimisticGoal, setOptimisticGoal]
		= useOptimistic(props.goal)

	const recent = useMemo(
		() => {

			const entries = recentEntries(
				props.goal.waterDuration,
				props.goal.entries,
				props.date)

			return {
				plan: entries.some(x => x == "plan"),
				schedule: entries.some(x => x == "schedule"),
				doit: entries.some(x => x == "doit"),
				milestone: entries.some(x => x == "milestone"),
			}
		}
		, [props.goal, props.date])
	const waterRemaining = useMemo(
		() => {
			const entryDates: Date[] =
				optimisticGoal.entries.map(
					x => x.date
				)

			const lastDate =
				findLastDate(props.date, entryDates)
			if (lastDate) {

				const diff =
					differenceInDays(props.date, lastDate)
				console.log("last date", lastDate)
				console.log("prop date", props.date)
				console.log("diff", diff)
				console.log("props.goal.waterDuration", props.goal.waterDuration)

				const result = props.goal.waterDuration - diff
				console.log("result", result)
				return result
			}

			return "new"
		}
		, [optimisticGoal, props.goal, props.date])

	const status = useMemo(
		() => {
			return {
				plan: optimisticGoal.entries.find(
					x =>
						x.type == "plan" &&
						isSameDate(x.date, props.date)
				),

				schedule: optimisticGoal.entries.find(
					x =>
						x.type == "schedule" &&
						isSameDate(x.date, props.date)
				),

				doit: optimisticGoal.entries.find(
					x =>
						x.type == "doit" &&
						isSameDate(x.date, props.date)
				),

				milestone: optimisticGoal.entries.find(
					x =>
						x.type == "milestone" &&
						isSameDate(x.date, props.date)
				)
			}
		}, [optimisticGoal, props.goal, props.date])

	function handlePlan() {
		startTransition(async () => {

			if (!status["plan"]) {
				let tempGoal = { ...props.goal }

				tempGoal.entries.push(
					{
						id: 1,
						date: props.date,
						type: "plan",
					})

				console.dir(tempGoal)
				setOptimisticGoal(tempGoal)

				await addEntryAction(props.goal.id, "plan", props.date)
			}
			else {
				let tempGoal = { ...props.goal }

				tempGoal.entries =
					tempGoal
						.entries
						.filter(x => x.id != (status.plan?.id ?? 0))
				setOptimisticGoal(tempGoal)
				await deleteEntryAction(status.plan.id)
			}

		})

	}

	function handleSchedule() {
		startTransition(async () => {
			if (!status.schedule) {

				let tempGoal = { ...props.goal }

				tempGoal.entries.push(
					{
						id: 1,
						date: props.date,
						type: "schedule",
					})

				console.dir(tempGoal)
				setOptimisticGoal(tempGoal)
				addEntryAction(props.goal.id, "schedule", props.date)
			}
			else {
				let tempGoal = { ...props.goal }

				tempGoal.entries =
					tempGoal
						.entries
						.filter(x => x.id != (status.schedule?.id ?? 0))
				setOptimisticGoal(tempGoal)
				deleteEntryAction(status.schedule.id)
			}
		})
	}

	function handleDoIt() {
		startTransition(async () => {
			if (!status.doit) {
				let tempGoal = { ...props.goal }

				tempGoal.entries.push(
					{
						id: 1,
						date: props.date,
						type: "doit",
					})

				console.dir(tempGoal)
				setOptimisticGoal(tempGoal)
				addEntryAction(props.goal.id, "doit", props.date)
			}
			else {
				let tempGoal = { ...props.goal }

				tempGoal.entries =
					tempGoal
						.entries
						.filter(x => x.id != (status.doit?.id ?? 0))
				setOptimisticGoal(tempGoal)
				deleteEntryAction(status.doit.id)
			}
		})
	}

	function handleMilestone() {
		startTransition(async () => {
			if (!status.milestone) {
				let tempGoal = { ...props.goal }

				tempGoal.entries.push(
					{
						id: 1,
						date: props.date,
						type: "milestone",
					})

				console.dir(tempGoal)
				setOptimisticGoal(tempGoal)
				addEntryAction(props.goal.id, "milestone", props.date)
			}
			else {
				let tempGoal = { ...props.goal }

				tempGoal.entries =
					tempGoal
						.entries
						.filter(x => x.id != (status.milestone?.id ?? 0))
				setOptimisticGoal(tempGoal)
				deleteEntryAction(status.milestone.id)
			}
		})
	}

	return <ListItem sx={{ pl: 0 }}>
		<Stack sx={{ borderLeftColor: "#b2c0d6", borderLeftWidth: "3pt", borderLeftStyle: "solid" }}>
			<Stack direction={"row"} sx={{ pl: "5pt", pr: "15pt", alignItems: "center" }}>
				<Typography>{props.goal.name}</Typography>
				<Box sx={{ flexGrow: 1 }} />

				{props.showSort &&
					<Box>
						sort:
						{props.goal.waterRemaining}
					</Box>
				}
				<Chip

					sx={{ background: typeof (waterRemaining) === "number" && waterRemaining >= 0 ? "#a1db86" : "#ddd" }}

					label={
						<>
							{waterRemaining &&

								<Typography>{waterRemaining}</Typography>
							}
							{!waterRemaining && waterRemaining != 0 &&

								<Typography>
									water error</Typography>
							}
						</>
					}>
				</Chip >


			</Stack>
			<Stack
				direction={"row"}
				sx={{ pt: "2pt" }}
			>
				<EntryButton
					onClick={handlePlan}
					enabled={status.plan != undefined}
					highlight={recent.plan}
					label="plan"
				></EntryButton>
				<EntryButton
					onClick={handleSchedule}
					enabled={status.schedule != undefined}
					highlight={recent.schedule}
					label="schedule"
				></EntryButton>
				<EntryButton
					onClick={handleDoIt}
					enabled={status.doit != undefined}
					highlight={recent.doit}
					label="did it"
				></EntryButton>
				{props.goal.milestoneEnabled &&
					<EntryButton
						onClick={handleMilestone}
						enabled={status.milestone != undefined}
						highlight={recent.milestone}
						label="milestone"
					></EntryButton>
				}
				{!props.goal.milestoneEnabled &&
					<Button >
						<Chip label="mileone"
							sx={
								{
									background: "white",
									color: "white"
								}
							}
						/>
					</Button>
				}
			</Stack>
			{props.showEntries &&
				<Stack>
					{props.goal.entries.map(e => (
						<div>
							{e.type} {e.date.toString()}</div>
					))}
				</Stack>
			}
		</Stack>

	</ListItem >
}
