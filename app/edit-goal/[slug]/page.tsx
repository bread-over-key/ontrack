import { updateGoalAction } from "@/app/actions/goal-actions";
import EditGoal from "@/components/edit-goal";
import { getAll } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { Box, Typography } from "@mui/material";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {

	const { slug } = await params
	const goalDtoList: GoalDto[] = await getAll();

	const goal: GoalDto | undefined =
		goalDtoList.find(x => x.id.toString() == slug)

	if (!goal) {
		return <div>goal not found</div>
	}

	return <Box>

		<Typography>goal: {slug}</Typography>
		<EditGoal
			goalDto={goal}
			onUpdate={updateGoalAction}
		></EditGoal>
	</Box>

}
