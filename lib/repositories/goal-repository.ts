
import { Goal } from "@/generated/prisma/client";
import { prisma } from "../prisma";

// crud

export async function getAll() {

	return await prisma.goal.findMany();

}


export async function getGoal(id: number) {
	return await prisma.goal.findUnique(
		{
			where: {
				id: id
			}
		}
	)
}

export async function createGoal(goal: Omit<Goal, "id">): Promise<Goal> {
	return await prisma.goal.create({
		data: goal
	})
}

export async function updateGoal(id: number, goal: Omit<Goal, "id">) {
	return await prisma.goal.update(
		{
			where: {
				id: id
			},
			data: goal
		}
	)
}

export async function deleteGoal(id: number) {
	return await prisma.goal.delete(
		{
			where: {
				id: id
			}
		}
	)
}

// custom

export async function getAllGoalsWithEntries() {

	return await prisma.goal.findMany(
		{
			include: {
				entries: true
			}
		}
	);

}
