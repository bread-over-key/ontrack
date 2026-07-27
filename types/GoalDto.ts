import { EntryDto } from "./EntryDto"

export interface GoalDto {

	id: number,
	name: string,
	waterDuration: number,
	milestoneEnabled: boolean
	archived: boolean
	totalEntries: number
	waterRemaining: number
	daysPastWater: number
	recurring: boolean

	entries: EntryDto[]
}
