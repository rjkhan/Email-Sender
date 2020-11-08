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
			columns: [],
			data: [],
		};

		this.processFile = this.processFile.bind(this);
	}

	/**
	 * Process File.
	 * 
	 * Split the csv content into columns and data.
	 *
	 * @author Rabnawaz jansher
	 * @param {string} content  csv formatted string
	 */
	processFile(content) {
		const contentArray = content.split('\n');
		const columns = contentArray.shift().split(',');
		const data = contentArray.map(ln => ln.split(','));

		console.log(columns, data);

		this.setState({
			columns,
			data,
		});
	}

	render() {
		// TODO:
		// Make Datatable into a class with props so that we can pass 
		// {columns} and {data} into it, since now it consists of static functions.
		return (
			<div className="App">
				<Container maxWidth="lg">
					<Grid container spacing={3}>
						<Grid item xs={8}>
							<Box>
								<Datatable/>
							</Box>
						</Grid>
			
					 
						<Grid item xs={4}>
						<Box>
							<SimpleForm/>
							</Box>
							<br></br>
							<br></br>
							<br></br>
							<Box>
								<FileUpload onSubmit={this.processFile} />
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
