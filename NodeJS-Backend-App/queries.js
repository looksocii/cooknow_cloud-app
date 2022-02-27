// Create Logger
const { createLogger, format, transports } = require("winston")
const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.colorize(),
        format.printf((info) => `[ ${info.level} ] => ${info.message}`)
    ),
    transports: [new transports.Console()],
})

// Setting DataBase Config
const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "CookNow",
    password: "528491",
    port: 5432,
})

// View All User Account
const getUsers = (request, response) => {
    pool.query("SELECT * FROM UserAccount", (error, results) => {
        if (error) {
            logger.error(error)
        }
        response.status(200).json(results.rows)
        // Logging
        logger.info("GET /" + request.get("host") + request.originalUrl)
    })
}

// Update User Account
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { UserName, PassWord, Email, Phone, BirthDate } = request.body
    pool.query(
        "UPDATE UserAccount SET User_Name = $1, Pass_Word = $2, Email = $3, Phone = $4, birth_date = $5 WHERE id = $6",
        [UserName, PassWord, Email, Phone, BirthDate, id],
        (error, results) => {
            if (error) {
                throw error
            } else {
                // Response and Logging
                response.status(201).send(`User modified with ID : ${id}`)
                logger.info("PUT /" + "User modified with ID : " + id)
            }
            response.status(200).send(`User modified with ID : ${id}`)
        }
    )
}

// Create User Account
const createUser = (request, response) => {
    const { UserName, PassWord, Email, Phone, BirthDate } = request.body
    pool.query(
        "INSERT INTO UserAccount (User_Name, Pass_Word, Email, Phone, birth_date) VALUES ($1, $2, $3, $4, $5)",
        [UserName, PassWord, Email, Phone, BirthDate],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response
                    .status(201)
                    .send(`User added with User Name : ${UserName}`)
                logger.info(
                    "POST /" + "User added with User Name : " + UserName
                )
            }
        }
    )
}

// Exports QUERY Function to nodejs-backend-app
module.exports = {
    getUsers,
    createUser,
    updateUser,
}
