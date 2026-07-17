"use client"

import { GoalDto } from "@/types/GoalDto";
import { Stack, Typography, TextField, Checkbox, Button } from "@mui/material";
import { useState, useEffect } from "react";

interface EditGoalProps {
	goalDto: GoalDto
	onUpdate: (
		id: number,
		goalDto: Omit<GoalDto, "id" | "entries">
	) => void
}

export default function EditGoal(props: EditGoalProps) {


	const [goal, setGoal] = useState<GoalDto>(props.goalDto);


	function updateParameter<K extends keyof GoalDto>
		(param: K, value: GoalDto[K]) {
		let newGoal: GoalDto = { ...goal };
		newGoal[param] = value
		console.dir(newGoal)
		setGoal(newGoal)
		console.dir(newGoal)
	}

	function handleUpdate() {
		const { id, ...newGoal } = goal
		props.onUpdate(goal.id, newGoal)
		console.dir(newGoal)
	}

	return <Stack spacing={2} >
		<TextField
			label={"name"}
			value={goal.name}
			onChange={e => updateParameter("name", e.target.value)} />
		<TextField
			label={"water duration"}
			type="number"
			value={goal.waterDuration}
			onChange={
				e => updateParameter(
					"waterDuration",
					Number.parseInt(e.target.value)
				)
			}
		/>
		<Typography>archived</Typography>
		<Checkbox
			checked={goal.archived}
			onChange={
				e => updateParameter(
					"archived",
					e.target.checked
				)
			}
		/>
		<Typography>milestone enabled`</Typography>
		<Checkbox
			checked={goal.milestoneEnabled}
			onChange={
				e => updateParameter(
					"milestoneEnabled",
					e.target.checked
				)
			}
		/>
		<Button onClick={handleUpdate}>Update</Button>
	</Stack>
}
