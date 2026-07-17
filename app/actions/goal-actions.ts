"use server"

import { createGoal, deleteGoal, getAll, updateGoal } from "@/lib/services/goal-service";
import { GoalDto } from "@/types/GoalDto";
import { revalidatePath } from "next/cache";

export async function getAllAction() {

	await getAll()

	revalidatePath("/goals")
}


export async function createGoalAction(name: string) {
	await createGoal(name)
	revalidatePath("/goals")
}

export async function updateGoalAction(id: number, goalDto: Omit<GoalDto, "id" | "entries">) {

	return await updateGoal(id, goalDto);
}

export async function deleteGoalAction(id: number) {
	await deleteGoal(id)
	revalidatePath("/goals")

}
