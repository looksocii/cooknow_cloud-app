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
                logger.info("PUT /" + request.get("host") + request.originalUrl)
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
                    "POST /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
}

// Delete User Account
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(
        "DELETE FROM UserAccount WHERE id = $1",
        [id],
        (error, results) => {
            if (error) {
                throw error
            } else {
                // Response and Logging
                response.status(200).send(`User deleted with ID : ${id}`)
                logger.info(
                    "DELETE /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
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

// Update Food Menu
const updateFood = (request, response) => {
    const id = parseInt(request.params.id)
    const { FoodName, FoodDetail, AddDate, UserAccountID } = request.body
    pool.query(
        "UPDATE FoodMenu SET Food_Name = $1, Food_Detail = $2, Add_Date = $3, UserAccount_ID = $4 WHERE id = $5",
        [FoodName, FoodDetail, AddDate, UserAccountID, id],
        (error, results) => {
            if (error) {
                throw error
            } else {
                // Response and Logging
                response.status(200).send(`Food modified with ID : ${id}`)
                logger.info("PUT /" + request.get("host") + request.originalUrl)
            }
        }
    )
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
                    "POST /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
}

// Delete Food Menu
const deleteFood = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query("DELETE FROM FoodMenu WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error
        } else {
            // Response and Logging
            response.status(200).send(`Food deleted with ID : ${id}`)
            logger.info("DELETE /" + request.get("host") + request.originalUrl)
        }
    })
}

// -----------------------------------------------------------------------------
//                      Review Food Table
// -----------------------------------------------------------------------------

// Create Review Food
const createReview = (request, response) => {
    const { ReviewDetail, Rating, ReviewDate, UserAccountID, FoodMenuID } =
        request.body
    pool.query(
        "INSERT INTO ReviewFood (Review_Detail, Rating, Review_Date, UserAccount_ID, FoodMenu_ID) VALUES ($1, $2, $3, $4, $5)",
        [ReviewDetail, Rating, ReviewDate, UserAccountID, FoodMenuID],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response
                    .status(201)
                    .send(`Review added to food ID : ${FoodMenuID}`)
                logger.info(
                    "POST /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
}

// View All Review of Food
const getReviews = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(
        "SELECT * FROM ReviewFood WHERE FoodMenu_ID = $1",
        [id],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response.status(200).json(results.rows)
                logger.info("GET /" + request.get("host") + request.originalUrl)
            }
        }
    )
}

// -----------------------------------------------------------------------------
//                      Share Food Table
// -----------------------------------------------------------------------------

// Create Share Food
const createShare = (request, response) => {
    const { ShareDate, UserAccountID, FoodMenuID } = request.body
    pool.query(
        "INSERT INTO ShareFood (Share_Date, UserAccount_ID, FoodMenu_ID) VALUES ($1, $2, $3)",
        [ShareDate, UserAccountID, FoodMenuID],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response
                    .status(201)
                    .send(`Share food of user ID : ${UserAccountID}`)
                logger.info(
                    "POST /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
}

// View All User's Share Food
const getSharese = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(
        "SELECT * FROM ShareFood AS sf JOIN FoodMenu AS fm ON sf.FoodMenu_ID = fm.ID WHERE sf.UserAccount_ID = $1",
        [id],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response.status(200).json(results.rows)
                logger.info("GET /" + request.get("host") + request.originalUrl)
            }
        }
    )
}

// -----------------------------------------------------------------------------
//                      Image Food Table
// -----------------------------------------------------------------------------

// Create Image Food
const createImage = (request, response) => {
    const { FoodImg, UserAccountID, FoodMenuID } = request.body
    pool.query(
        "INSERT INTO ImageFood (Food_Img, UserAccount_ID, FoodMenu_ID) VALUES ($1, $2, $3)",
        [FoodImg, UserAccountID, FoodMenuID],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response.status(201).send(`Image of food ID : ${FoodMenuID}`)
                logger.info(
                    "POST /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
}

// View All Image of Food
const getImages = (request, response) => {
    pool.query(
        "SELECT * FROM ImageFood AS if JOIN FoodMenu AS fm ON if.FoodMenu_ID = fm.ID",
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response.status(200).json(results.rows)
                logger.info("GET /" + request.get("host") + request.originalUrl)
            }
        }
    )
}

// -----------------------------------------------------------------------------
//                      Message Chat Table
// -----------------------------------------------------------------------------

// Create Message
const createMessage = (request, response) => {
    const { ContentText, AddDate, FromUserID, UserAccountID } = request.body
    pool.query(
        "INSERT INTO MessageChat (ContentText, Add_Date, From_User_ID, UserAccount_ID) VALUES ($1, $2, $3, $4)",
        [ContentText, AddDate, FromUserID, UserAccountID],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response
                    .status(201)
                    .send(`Message from user ID : ${FromUserID}`)
                logger.info(
                    "POST /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
}

// View All Message Chat of User
const getMessageChat = (request, response) => {
    const FromID = parseInt(request.query.FromID)
    const id = parseInt(request.query.id)
    pool.query(
        "SELECT * FROM MessageChat WHERE From_User_ID = $1 and UserAccount_ID = $2",
        [FromID, id],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response.status(200).json(results.rows)
                logger.info("GET /" + request.get("host") + request.originalUrl)
            }
        }
    )
}

// -----------------------------------------------------------------------------
//                      Follow Table
// -----------------------------------------------------------------------------

// Create Follow User
const createFollow = (request, response) => {
    const { FollowingUserID, UserAccountID } = request.body
    pool.query(
        "INSERT INTO Follow (Following_User_ID, UserAccount_ID) VALUES ($1, $2)",
        [FollowingUserID, UserAccountID],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response
                    .status(201)
                    .send(`Following User ID : ${FollowingUserID}`)
                logger.info(
                    "POST /" + request.get("host") + request.originalUrl
                )
            }
        }
    )
}

// View All Follower of User
const getFollower = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query(
        "SELECT * FROM Follow WHERE UserAccount_ID = $1",
        [id],
        (error, results) => {
            if (error) {
                logger.error(error)
            } else {
                // Response and Logging
                response.status(200).json(results.rows)
                logger.info("GET /" + request.get("host") + request.originalUrl)
            }
        }
    )
}

// Unfollow User
const deleteFollowing = (request, response) => {
    const FollowingUserID = parseInt(request.query.FollowingUserID)
    const id = parseInt(request.query.id)
    pool.query(
        "DELETE FROM Follow WHERE Following_User_ID = $1 and UserAccount_ID = $2",
        [FollowingUserID, id],
        (error, results) => {
            if (error) {
                throw error
            } else {
                // Response and Logging
                response
                    .status(200)
                    .send(`Unfollow User ID : ${FollowingUserID}`)
                logger.info(
                    "DELETE /" + request.get("host") + request.originalUrl
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
    updateFood,
    deleteFood,
    createReview,
    getReviews,
    createShare,
    getSharese,
    createImage,
    getImages,
    createMessage,
    getMessageChat,
    createFollow,
    getFollower,
    deleteFollowing,
}
