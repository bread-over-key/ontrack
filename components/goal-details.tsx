import { addEntryAction, deleteEntryAction } from "@/app/actions/entry-actions";
import { differenceInDays, findLastDate, isSameDate } from "@/lib/date-compare";
import { GoalDto } from "@/types/GoalDto";
import { ListItem, Stack, Chip, Typography, Box, Button, Divider } from "@mui/material";
import { useMemo } from "react";

export default function GoalDetails(props: {
	goal: GoalDto,
	date: Date
	showEntries: boolean
}) {

	const waterRemaining = useMemo(
		() => {
			const entryDates: Date[] =
				props.goal.entries.map(
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
		, [props.goal, props.date])


	const status = useMemo(
		() => {
			return {

				plan: props.goal.entries.find(
					x =>
						x.type == "plan" &&
						isSameDate(x.date, props.date)
				),

				schedule: props.goal.entries.find(
					x =>
						x.type == "schedule" &&
						isSameDate(x.date, props.date)
				),

				doit: props.goal.entries.find(
					x =>
						x.type == "doit" &&
						isSameDate(x.date, props.date)
				),

				milestone: props.goal.entries.find(
					x =>
						x.type == "milestone" &&
						isSameDate(x.date, props.date)
				)
			}
		}, [props.goal, props.date])

	function handlePlan() {
		if (!status.plan)
			addEntryAction(props.goal.id, "plan", props.date)
		else {
			deleteEntryAction(status.plan.id)
		}
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
			<Stack direction={"row"} sx={{ pl: "5pt", alignItems:"center" }}>
				<Typography>{props.goal.name}</Typography>
				<Box sx={{ flexGrow: 1 }} />

				<Chip

					sx={{background: typeof(waterRemaining) === "number" && waterRemaining >= 0 ? "#a1db86" :"#ddd"}}

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
			sx={{pt:"2pt"}}
		>
			<Button onClick={handlePlan} sx={{ p: 0, m: 0 }} >
				<Chip
					label="plan"
					sx={
						{
							background: status.plan ? "#b2c0d6" : "inherit",
							color: status.plan ? "black" :"gray"
						}
					}
				/>
			</Button>
			<Button onClick={handleSchedule} sx={{ p: 0 }}>
				<Chip label="schedule"
					sx={
						{
							background: status.schedule ? "#b2c0d6" : "inherit",
							color: status.schedule ? "black" :"gray"
						}
					}
				/>
			</Button>
			<Button onClick={handleDoIt} sx={{ p: 0 }}>
				<Chip label="did it"
					sx={
						{
							background: status.doit ? "#b2c0d6" : "inherit",
							color: status.doit ? "black" :"gray"
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
							color: status.milestone ? "black" :"gray"
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
