"use server"

import AddGoal from "@/components/add-goal";
import { createGoal, getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField } from "@mui/material"
import { revalidatePath } from "next/cache";
import { createGoalAction } from "../actions/goal-actions";

export default async function Page() {

	const goalDtoList: GoalDto[] = await getAll();

	async function handleAdd(name: string) {
		"use server"
		await createGoalAction(name)
	}


	// ui

	return <Stack>
		<AddGoal handleAdd={handleAdd} />
		<List sx={{ flex: 1 }}>
			{
				goalDtoList?.map(goal => (
					<ListItem>
						<ListItemButton>
							<ListItemText>
								{goal.name}
							</ListItemText>
						</ListItemButton>
					</ListItem>
				))
			}
		</List>
	</Stack>
}
