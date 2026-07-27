import { addEntryAction, deleteEntryAction } from "@/app/actions/entry-actions";
import { differenceInDays, findLastDate, isSameDate } from "@/lib/date-compare";
import { EntryDto } from "@/types/EntryDto";
import { GoalDto } from "@/types/GoalDto";
import { ListItem, Stack, Chip, Typography, Box, Button, Divider } from "@mui/material";
import { type } from "os";
import { startTransition, useEffect, useMemo, useOptimistic, useTransition } from "react";

export default function GoalDetails(props: {
	goal: GoalDto,
	date: Date
	showEntries: boolean
	showSort: boolean
}) {


	const [optimisticGoal, setOptimisticGoal]
		= useOptimistic(props.goal)

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

				return props.goal.waterDuration - diff
			}

			return "new"
		}
		, [optimisticGoal, props.goal, props.date])



	useEffect(() => {

		console.log("optimistic updated")
		console.dir(optimisticGoal)

	}, [optimisticGoal])


	const status = useMemo(
		() => {
			console.log("status upadted")
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
		console.log("handle plan")
		startTransition(async () => {

			if (!status.plan) {
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
				console.log("new goal")
				console.log("id to delete", status.plan.id)
				console.dir(tempGoal)
				setOptimisticGoal(tempGoal)
				await deleteEntryAction(status.plan.id)
			}
			console.log("end transition")

		})

	}

	function handleSchedule() {
		if (!status.schedule)
			addEntryAction(props.goal.id, "schedule", props.date)
		else {
			deleteEntryAction(status.schedule.id)
		}
	}

	function handleDoIt() {
		if (!status.doit)
			addEntryAction(props.goal.id, "doit", props.date)
		else {
			deleteEntryAction(status.doit.id)
		}
	}

	function handleMilestone() {
		if (!status.milestone)
			addEntryAction(props.goal.id, "milestone", props.date)
		else {
			deleteEntryAction(status.milestone.id)
		}
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
				<Button onClick={handlePlan} sx={{ p: 0, m: 0 }} >
					<Chip
						label="plan"
						sx={
							{
								background: status.plan ? "#b2c0d6" : "inherit",
								color: status.plan ? "black" : "gray"
							}
						}
					/>
				</Button>
				<Button onClick={handleSchedule} sx={{ p: 0 }}>
					<Chip label="schedule"
						sx={
							{
								background: status.schedule ? "#b2c0d6" : "inherit",
								color: status.schedule ? "black" : "gray"
							}
						}
					/>
				</Button>
				<Button onClick={handleDoIt} sx={{ p: 0 }}>
					<Chip label="did it"
						sx={
							{
								background: status.doit ? "#b2c0d6" : "inherit",
								color: status.doit ? "black" : "gray"
							}
						}
					/>
				</Button>
				{props.goal.milestoneEnabled &&
					<Button onClick={handleMilestone} sx={{ p: 0 }}>
						<Chip label="milestone"
							sx={
								{
									background: status.milestone ? "#b2c0d6" : "inherit",
									color: status.milestone ? "black" : "gray"
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
