"use server"

import { createGoal, deleteGoal, getAll, updateGoal } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { revalidatePath } from "next/cache";

export async function getAllAction() {

	await getAll()

	revalidatePath("/goals")
	revalidatePath("/")
}


export async function createGoalAction(name: string) {
	await createGoal(name)
	revalidatePath("/goals")
	revalidatePath("/")
	revalidatePath('/edit-goal/[slug]', 'page')
}

export async function updateGoalAction(id: number, goalDto: Omit<GoalDto, "id" | "entries">) {

	const result = await updateGoal(id, goalDto);
	revalidatePath("/goals")
	revalidatePath("/")
	revalidatePath('/edit-goal/[slug]', 'page')
	return result
}

export async function deleteGoalAction(id: number) {
	await deleteGoal(id)
	revalidatePath("/goals")
	revalidatePath("/")
	revalidatePath('/edit-goal/[slug]', 'page')

}
