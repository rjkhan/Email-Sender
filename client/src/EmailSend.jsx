import React from 'react';
import {
	Button,
	Card,
	CardContent,
	CardActions,
} from '@material-ui/core';

export default function EmailSend() {

	return (
		<Card>
			<CardContent>
				Send email to selected person
				emails.
			</CardContent>
			<CardActions style={{ justifyContent: 'flex-end' }}>
				<Button
					size="small"
					variant="contained"
				>
					Click
				</Button>
			</CardActions>
		</Card>
	);
}
