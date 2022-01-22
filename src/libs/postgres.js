const { Pool } = require( 'pg')
const {config} =require('../config/config')

//const USER = encodeURIComponent(config.dbUser);
//const PASSWORD = encodeURIComponent(config.dbPassword);
//const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

class Postgres {
    
    constructor(){
         
    }
    
    
    /**
     * @private
     * @description singleton pattern for pool connection
     * @returns {object} - connection client
     */
     

     async getConnection() {
        
        try {
            if (!this.connection) {
               this.connection = new Pool(
                   {
                        host: config.dbHost,
                        user: config.dbUser,
                        password: config.dbPassword,
                        database: config.dbName,
                        max: process.env.DB_MAX_CONNECTIONS || 20,
                        idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT_MILLIS || 30000,
                        connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT_MILLIS ||2000
                   }

                )
                console.log('Connected succesfully')
            }
            return this.connection
        } catch (error) {
            console.log(error)
        }
    }

     /**
     * @description query process in table
     * @param {string} request - SQL string request
     * @returns {Object} - response query postgresDB
     */
      async query(request, values=[]) {
        try {
            const connection = await this.getConnection()
            const client= await connection.connect()

            const response= await client.query(request,values)

            client.release()
            return await response//Security Problem as we shouldn't allow customer to send SQL query to DB directly
        } catch (error) {
            console.log(error)
        }
    }

    
}

module.exports = Postgres