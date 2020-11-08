import React, { Component } from 'react';
import {
	Container,
	Grid,
	Box,
} from '@material-ui/core';
import Datatable from './Datatable';
import FileUpload from './FileUpload';
import SimpleForm from './SimpleForm';
import Confirm from './EmailSend';

class App extends Component {

	constructor() {
		super();
		this.state = {
			formUpdate: false 
		};

	}
	/**
 * Returns update state.
 * @return {formUpdate} state update.
 */
	onFormUpdated = () => {
		this.setState({formUpdate:true},() => {
			this.setState({formUpdate :false})
		})
	}

	
	
	render() {
		if(this.state.formUpdate){
			return ("<div>loading ...</div>")
		}

		return (
			<div className="App">
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						<Grid item xs={8}>
							<Box>
								<Datatable />
							</Box>
						</Grid>
						<Grid item xs={4}>
						<Box>
							<SimpleForm callback={this.onFormUpdated} />
							</Box>
							<br></br>
							<br></br>
							<br></br>
							<Box>
								<FileUpload callback={this.onFormUpdated} />
							</Box>
							<Box>
								<Confirm />
							</Box>
						 
						</Grid>
					</Grid>
				 
				</Container>
			</div>
		);
	}
}


export default App;
