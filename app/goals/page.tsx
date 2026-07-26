"use server"

import AddGoal from "@/components/add-goal";
import { createGoal, getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material"
import { revalidatePath } from "next/cache";
import { createGoalAction } from "../actions/goal-actions";
import Link from "next/link";

export default async function Page() {

	const goalDtoList: GoalDto[] = await getAll();

	async function handleAdd(name: string) {
		"use server"
		await createGoalAction(name)
	}

	// ui

	return <Stack sx={{ maxHeight: "100%", overflow: "scroll" }}>
		<AddGoal handleAdd={handleAdd} />
		<List sx={{ flex: 1 }}>
			{
				goalDtoList?.map(goal => (
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
