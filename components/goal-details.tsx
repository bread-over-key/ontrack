import { addEntryAction } from "@/app/actions/entry-actions";
import { GoalDto } from "@/types/GoalDto";
import { ListItem, Stack, Chip, Typography, Box, Button } from "@mui/material";
import { useMemo } from "react";

export default function GoalDetails(props: {
	goal: GoalDto,
	date: Date
}) {

	const status = useMemo(
		() => {
			return {
				plan: props.goal.entries.some(x => x.type == "plan" && x.date.getDate() == props.date.getDate()).e,
				schedule: props.goal.entries.some(x => x.type == "schedule" && x.date.getDate() == props.date.getDate()),
				doit: props.goal.entries.some(x => x.type == "doit" && x.date.getDate() == props.date.getDate()),
				milestone: props.goal.entries.some(x => x.type == "milestone" && x.date.getDate() == props.date.getDate()),
			}
		}, [props.goal, props.date])

	function handlePlan() {
		addEntryAction(props.goal.id, "plan", props.date)
	}

	function handleSchedule() {
		addEntryAction(props.goal.id, "schedule", props.date)
	}

	function handleDoIt() {
		addEntryAction(props.goal.id, "doit", props.date)
	}

	function handleMilestone() {
		addEntryAction(props.goal.id, "milestone", props.date)
	}

	return <ListItem>
		<Stack>
			<Stack direction={"row"}>
				<Typography>{props.goal.name}</Typography>
				<Box sx={{ flexGrow: 1 }} />

				<Typography>water {props.goal.waterRemaining}</Typography>
			</Stack>
			<Stack direction={"row"} spacing={1}>
				<Button onClick={handlePlan}>
					<Chip label="plan" sx={{color: status ? "success" : "inherit"}} />
				</Button>
				<Button onClick={handleSchedule}>
					<Chip label="schedule" />
				</Button>
				<Button onClick={handleDoIt}>
					<Chip label="did it" />
				</Button>
				<Button onClick={handleMilestone}>
					<Chip label="milestone" />
				</Button>
			</Stack>
		</Stack>

	</ListItem>
}
