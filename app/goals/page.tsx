"use server"

import { getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField } from "@mui/material"

export default async function Page() {

	const goalDtoList: GoalDto[] = await getAll();

	// ui

	return <Stack>
		<Stack direction={"row"}>
			<TextField label="name"></TextField>
			<Button>add</Button>
		</Stack>
		<List sx={{flex: 1}}>
			{
				goalDtoList?.map(goal => (
					<ListItem>
						<ListItemButton>
							<ListItemText>
								{goal.name}
							</ListItemText>
						</ListItemButton>
						<ListItemButton>
							<ListItemIcon>
								delete
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				))
			}
		</List>
	</Stack>
}
