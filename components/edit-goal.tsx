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
		setGoal(newGoal)

	}

	function handleUpdate() {
		const { id, ...newGoal } = goal
		props.onUpdate(goal.id, newGoal)
	}

	return <Stack>
		<TextField
			label={"name"}
			value={goal.name}
			onChange={e => updateParameter("name", e.target.value)} />
		<TextField />
		<TextField />
		<TextField />
		<Checkbox />
		<Button onClick={handleUpdate}>Update</Button>
	</Stack>
}
