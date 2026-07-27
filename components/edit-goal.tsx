"use client"

import { deleteGoalAction } from "@/app/actions/goal-actions";
import { GoalDto } from "@/types/GoalDto";
import { Stack, Typography, TextField, Checkbox, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface EditGoalProps {
	goalDto: GoalDto
	onUpdate: (
		id: number,
		goalDto: Omit<GoalDto, "id" | "entries">
	) => void
	onDelete: (id: number) => {}
}

export default function EditGoal(props: EditGoalProps) {

	const router = useRouter();
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

	function handleDelete() {
		console.dir(props.goalDto)
		const result = confirm("are you sure")

		if (result) {
			console.dir(props.goalDto.id)
			props.onDelete(props.goalDto.id);
			router.push("/goals")
		}

	}

	return <Stack spacing={3} >
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
		<Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
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
		</Stack>
		<Stack direction={"row"} sx={{ alignItems: "center", justifyContent: "space-between" }}>
			<Typography>milestone enabled</Typography>
			<Checkbox
				checked={goal.milestoneEnabled}
				onChange={
					e => updateParameter(
						"milestoneEnabled",
						e.target.checked
					)
				}
			/>
		</Stack>
		<Stack direction={"row"} sx={{ flexGrow: 1, alignItems: "center", justifyContent: "space-between" }}>
			<Button onClick={handleDelete} variant="outlined" color="error">Delete</Button>
			<Button onClick={handleUpdate} variant="contained">Update</Button>
		</Stack>
	</Stack>
}
