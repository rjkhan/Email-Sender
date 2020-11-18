//sqllite handler
const sqlite3 = require('sqlite3').verbose();

class DB{

	/**
	* class constructor
	*/
	constructor(){}
	
	/**
	 * create database connection
	 * 
	 * @return {db} database connection.
	 */
	create_connection() {
		let db = new sqlite3.Database("/Users/rabnawazjansher/Documents/trailbee/email-sender/server/db/mydb.db", sqlite3.OPEN_READWRITE, (err) => {
				if (err) {
						console.error(err.message);
				}
				else
				{
					console.log('Connected to the mydatabase database.');
					// const schema = this.dbSchema();
					// this.runSchema(schema)
					
				}	
		});   
		return db; 
	}

/**
 * close database connection.
 *
 * @param {db} db database connection handler.
 * @return {string} status message.
 */
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

/**
 * insert recipient into database.
 *
 * @param {string} sql sql query.
 * @param {array} params parameter for sql query.
 * @param {string} connectiob database connection.
 * 
 * @return {number} id last inerted recipeints id.
 */
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


/**
 * get recipient by id.
 *
 * @param {string} sql sql query.
 * @param {array} params parameter for sql query.
 * @param {string} connectiob database connection.
 * 
 * @return {object} recipient object has been return.
 */
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

/**
 * return all recipients.
 *
 * @param {string} sql sql query.
 * @param {array} params parameter for sql query.
 * @param {string} connectiob database connection.
 * 
 * @return {object} recipient object has been return.
 */

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


/**
 * delete recipent by id.
 *
 * @param {string} sql sql query.
 * @param {array} params parameter for sql query.
 * @param {string} connectiob database connection.
 * 
 * @return {number} deleted person id return.
 */
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

	dbSchema(){
		const table = `CREATE TABLE IF NOT EXISTS person (
			id integer NOT NULL PRIMARY KEY,
			first_name text ,
			laste_name text,
			email text,
			country text,
			gender text,
			disease text,
			external_id text,
			ipaddress text
		);`
		return table; 
	}
	/**
	 * run db schema.
	 *
	 * @param {string} dbSchema table schema.
	 * @return {boolean} true if executed successfully.
	 */

	runSchema(dbSchema){
		DB.exec(dbSchema, function(err){
			if (err) {
					console.log(err);
					return false;
			}
			else{
				console.log("schema executed");
				return true;
			}
		});
	}



}


module.exports = DB;