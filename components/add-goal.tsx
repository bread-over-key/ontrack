"use client"

import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

interface AddGoalProps {

	handleAdd: (name: string) => void;

}

export default function AddGoal(props: AddGoalProps) {

	const [newName, setNewName] = useState("");

	function handleAdd() {

		props.handleAdd(newName);

		setNewName("");

	}

	return <Stack direction={"row"}>
		<TextField label="name"
			value={newName}
			onChange={(e) => setNewName(e.target.value)}
		></TextField>
		<Button onClick={handleAdd}>add</Button>
	</Stack>

}
