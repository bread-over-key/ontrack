"use server"

import { createGoal, deleteGoal, getAll } from "@/lib/services/goal-service";
import { revalidatePath } from "next/cache";

export async function getAllAction() {

	await getAll()

	revalidatePath("/goals")
}


export async function createGoalAction(name: string) {
	await createGoal(name)
	revalidatePath("/goals")
}


export async function deleteGoalAction(name: string) {
	await deleteGoal(name)
	revalidatePath("/goals")

}
