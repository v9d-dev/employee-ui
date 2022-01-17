import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props) {
	const { dialogHandler, openDialog, heading, dialogInfo, onFileChange, handleOnImport } = props;
	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	return (
		<div>
			{/* <Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Import POC data
			</Button> */}
			<Dialog
				fullWidth
				maxWidth='sm'
				open={openDialog}
				onClose={() => dialogHandler(false)}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>{heading}</DialogTitle>
				<DialogContent>
					<DialogContentText>{dialogInfo}</DialogContentText>
					{/* <TextField
						autoFocus
						margin='dense'
						id='name'
						label='Email Address'
						type='email'
						fullWidth
					/> */}
					<Button variant='contained' component='label'>
						<input type='file' onChange={onFileChange} />
					</Button>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => dialogHandler(false)} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleOnImport} color='primary'>
						Upload
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
