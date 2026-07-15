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


export async function createGoal(name: string) {

	const newGoal: Omit<Goal, "id"> = {
		name: name,
		waterDuration: 1,
		milestoneEnabled: false,
		archived: false
	}

	const goal: Goal = await goalRepo.createGoal(newGoal);

	const goalDto: GoalDto = {
		id: goal.id,
		name: goal.name,
		waterDuration: goal.waterDuration,
		milestoneEnabled: goal.milestoneEnabled,
		archived: goal.archived,
		totalEntries: 0,
		waterRemaining: goal.waterDuration,
		daysPastWater: 0,
		entries: []
	};

	return goalDto;
}

export async function updateGoal(id: number, goalDto: Omit<GoalDto, "id" | "entries">) {

	return await goalRepo.updateGoal(id, goalDto);
}

export async function deleteGoal(id: number) {
	await goalRepo.deleteGoal(id);
}
