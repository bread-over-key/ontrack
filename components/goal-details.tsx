import { addEntryAction, deleteEntryAction } from "@/app/actions/entry-actions";
import { differenceInDays, findLastDate, isSameDate } from "@/lib/date-compare";
import { GoalDto } from "@/types/GoalDto";
import { ListItem, Stack, Chip, Typography, Box, Button } from "@mui/material";
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

			return 0
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

	return <ListItem>
		<Stack>
			<Stack direction={"row"}>
				<Typography>{props.goal.name}</Typography>
				<Box sx={{ flexGrow: 1 }} />

				{waterRemaining &&
					<Typography>water
						{waterRemaining}</Typography>
				}
			</Stack>
			<Stack direction={"row"} spacing={1}>
				<Button onClick={handlePlan}>
					<Chip
						label="plan"
						sx={
							{ background: status.plan ? "green" : "inherit" }
						}
					/>
				</Button>
				<Button onClick={handleSchedule}>
					<Chip label="schedule"
						sx={
							{ background: status.schedule ? "green" : "inherit" }
						}
					/>
				</Button>
				<Button onClick={handleDoIt}>
					<Chip label="did it"
						sx={
							{
								background: status.doit
									? "green" : "inherit"
							}
						}
					/>
				</Button>
				<Button onClick={handleMilestone}>
					<Chip label="milestone"
						sx={
							{ background: status.milestone ? "green" : "inherit" }
						}
					/>
				</Button>
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

	</ListItem>
}
