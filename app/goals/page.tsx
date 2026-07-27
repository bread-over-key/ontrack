"use server"

import AddGoal from "@/components/add-goal";
import { getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { createGoalAction } from "../actions/goal-actions";
import Link from "next/link";

export default async function Page() {

	const goalDtoList: GoalDto[] = await getAll();

	async function handleAdd(name: string) {
		"use server"
		await createGoalAction(name)
	}

	// ui

	return <Stack sx={{ maxHeight: "100%", overflow: "scroll" }} spacing={3}>
		<AddGoal handleAdd={handleAdd} />
		<Typography variant="h5">Recurring</Typography>
		<List sx={{ flex: 1 }}>
			{
				goalDtoList?.filter(x => x.recurring).map(goal => (
					<ListItem key={goal.id}>
						<Link href={"/edit-goal/" + goal.id}>
							<ListItemButton
							>
								<ListItemText>
									{goal.name} {goal.archived && <Typography color="error">archived</Typography>}
								</ListItemText>
							</ListItemButton>
						</Link>
					</ListItem>
				))
			}
		</List>
		<Typography variant="h5">Non Recurring</Typography>
		<List sx={{ flex: 1 }}>
			{
				goalDtoList?.filter(x => !x.recurring).map(goal => (
					<ListItem key={goal.id}>
						<Link href={"/edit-goal/" + goal.id}>
							<ListItemButton
							>
								<ListItemText>
									{goal.name} {goal.archived && <Typography color="error">archived</Typography>}
								</ListItemText>
							</ListItemButton>
						</Link>
					</ListItem>
				))
			}
		</List>
	</Stack >
}
