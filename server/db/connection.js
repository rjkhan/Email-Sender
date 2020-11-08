
const sqlite3 = require('sqlite3').verbose();

class DB{

	constructor(){}
		
	create_connection() {
			let db = new sqlite3.Database("/Users/rabnawazjansher/Documents/trailbee/email-sender/server/db/abc.db", sqlite3.OPEN_READWRITE, (err) => {
					if (err) {
							console.error(err.message);
					}
					else{
					console.log('Connected to the mydatabase database.');}
			});   
			return db; 
	}

	close_connection(db) {
			let status = false
			db.close((err) => {
			if (err) {
					status = false
			}
			else{
					status = true
			}
			});
			return (status ? console.log("connection close") : console.log("error")); 
	}

	insert_into_db(sql, params = [],connection) {
			return new Promise((resolve, reject) => {
				connection.run(sql, params, function (err,result) {
					if (err) {
						console.log('Error running sql ' + sql)
						console.log(err)
						reject(err)
					} else {
						resolve({ id: this.lastID })
					}
				})
			})
	}


	getRecipentById(sql, params = [],connection) {
			return new Promise((resolve, reject) => {
				connection.get(sql, params, function (err,result) {
					if (err) {
						console.log('Error running sql ' + sql)
						console.log(err)
						reject(err)
					} else {
							
						resolve({ person: result })
					}
				})
			})
	}

	getAllRecipents(sql, params = [],connection) {
			return new Promise((resolve, reject) => {
				connection.all(sql, params, function (err,result) {
					if (err) {
						console.log('Error running sql ' + sql)
						console.log(err)
						reject(err)
					} else {
							
						resolve({ person: result })
					}
				})
			})
	}


	deleteRecipent(sql, params = [],connection) {
			return new Promise((resolve, reject) => {
				connection.run(sql, params, function (err,result) {
					if (err) {
						console.log('Error running sql ' + sql)
						console.log(err)
						reject(err)
					} else {
						resolve({ person: params[0] })
					}
				})
			})
	}

}



module.exports = DB;