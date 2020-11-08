import React, { Component } from 'react';
import {
	Card,
	CardContent,
	CardActions,
} from '@material-ui/core';
import axios from 'axios';
import * as XLSX from 'xlsx';

 // process CSV data
 const processData = dataString => {
	const dataStringLines = dataString.split(/\r\n|\n/);
	const headers = dataStringLines[0].split(
		/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
	);

	const list = [];
	for (let i = 1; i < dataStringLines.length; i++) {
		const row = dataStringLines[i].split(
			/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
		);
		if (headers && row.length === headers.length) {
			const obj = {};
			for (let j = 0; j < headers.length; j++) {
				let d = row[j];
				if (d.length > 0) {
					if (d[0] === '"') d = d.substring(1, d.length - 1);
					if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
				}
				if (headers[j]) {
					obj[headers[j]] = d;
				}
			}

			// remove the blank rows
			if (Object.values(obj).filter(x => x).length > 0) {
				list.push(obj);
			}
		}
	}

	return list;
};


class FileUpload extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
	}

	 handleSubmit (e) {

		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = evt => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
			
			const formattedData = (processData(data));
			const apiUrl = "http://localhost:4000/server/add_recipients";
			const option = {
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: formattedData
			}
			axios.post(apiUrl,option)
			.then((response) => {
				//componentDidMount(){console.log(this.props.callback())}
				this.props.callback()
			})
			.catch((err) => {
				console.error(err);
			});	
		};

		reader.readAsBinaryString(file);
		
	}
		

	render() {
		return (
				<Card>
					<CardContent>
						<input type="file" accept=".csv,.xlsx,.xls" onChange={this.handleSubmit} />
					</CardContent>
					<CardActions style={{ justifyContent: 'flex-end' }}>	
					</CardActions>
				</Card>
		);
	}
}

export default FileUpload;
