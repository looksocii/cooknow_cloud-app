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

// Setting Data Base Config
const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "CookNow",
    password: "528491",
    port: 5432,
})

// -----------------------------------------------------------------------------
//                      User Account Table
// -----------------------------------------------------------------------------

// View All User Account
const getUsers = (request, response) => {
    pool.query("SELECT * FROM UserAccount", (error, results) => {
        if (error) {
            logger.error(error)
        } else {
            // Response and Logging
            response.status(200).json(results.rows)
            logger.info("GET /" + request.get("host") + request.originalUrl)
        }
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
                response.status(200).send(`User modified with ID : ${id}`)
                logger.info(
                    "PUT /" +
                        request.get("host") +
                        request.originalUrl
                )
            }
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
                    "POST /" +
                        request.get("host") +
                        request.originalUrl
                )
            }
        }
    )
}

// Delete User Account
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query("DELETE FROM UserAccount WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error
        } else {
            // Response and Logging
            response.status(200).send(`User deleted with ID : ${id}`)
            logger.info(
                "DELETE /" +
                    request.get("host") +
                    request.originalUrl
            )
        }
    })
}

// -----------------------------------------------------------------------------
//                      Food Menu Table
// -----------------------------------------------------------------------------

// View All Food Menu
const getFoods = (request, response) => {
    pool.query("SELECT * FROM FoodMenu", (error, results) => {
        if (error) {
            logger.error(error)
        } else {
            // Response and Logging
            response.status(200).json(results.rows)
            logger.info("GET /" + request.get("host") + request.originalUrl)
        }
    })
}

// Create Food Menu
const createFood = (request, response) => {
    const { FoodName, FoodDetail, AddDate, UserAccountID } = request.body
    pool.query(
        "INSERT INTO FoodMenu (Food_Name, Food_Detail, Add_Date, UserAccount_ID) VALUES ($1, $2, $3, $4)",
        [FoodName, FoodDetail, AddDate, UserAccountID],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response
                    .status(201)
                    .send(`Food added with Food Name : ${FoodName}`)
                logger.info(
                    "POST /" +
                        request.get("host") +
                        request.originalUrl
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
    deleteUser,
    getFoods,
    createFood,
}
