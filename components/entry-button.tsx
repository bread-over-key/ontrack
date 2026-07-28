"use client"

import { Button, Chip } from "@mui/material";
export default function EntryButton(

	{ onClick,
		enabled,
		highlight,
		label }
		: {
			onClick: () => void,
			enabled: boolean,
			highlight: boolean,
			label: string
		}) {
	return <Button onClick={onClick} sx={{ p: 0, m: 0 }} >
		{
			enabled &&

			<Chip
				label={label}
				sx={
					{
						background: "#b2c0d6",
						color: "black"
					}
				}
			/>
		}
		{
			!enabled && highlight &&

			<Chip
				label={label}
				variant="outlined"
				color="success"
				sx={
					{
						background: "inherit",
						color: "gray"
					}
				}
			/>
		}
		{
			!enabled && !highlight &&

			<Chip
				label={label}
				sx={
					{
						background: "inherit",
						color: "gray"
					}
				}
			/>
		}
	</Button>

}
