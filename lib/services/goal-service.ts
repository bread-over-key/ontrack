import { Entry, Goal } from "@/generated/prisma/browser";
import * as goalRepo from "@/lib/repositories/goal-repository"
import { GoalDto } from "@/types/GoalDto";


export async function getAll() {

	const goalsWithEntries: (Goal & { entries: Entry[] })[] = await goalRepo.getAllGoalsWithEntries();

	const goalsDto: GoalDto[] = goalsWithEntries.map(goal => {

		const waterRemaining = 0;
		const daysPastWater = 0;

		return {
			id: goal.id,
			name: goal.name,
			waterDuration: goal.waterDuration,
			milestoneEnabled: goal.milestoneEnabled,
			archived: goal.archived,
			totalEntries: goal.entries.length,
			waterRemaining: waterRemaining,
			daysPastWater: daysPastWater 
		} as GoalDto

	})
	return goalsDto

}
