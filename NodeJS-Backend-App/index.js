// Swagger UI
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

// Express
const express = require("express")
const bodyParser = require("body-parser")

// Import SQL Query and Create App
const db = require("./queries")
const app = express()
const port = 3000

// Create Express App
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// Swagger Document
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Create APIs

// ----------------- User Account -----------------
app.get("/users", db.getUsers)
app.post("/user", db.createUser)
app.put("/user/:id", db.updateUser)
app.delete("/deleteuser/:id", db.deleteUser)
// ------------------------------------------------

// ------------------ Food Menu ------------------
app.get("/foods", db.getFoods)
app.post("/food", db.createFood)
app.put("/food/:id", db.updateFood)
app.delete("/deletefood/:id", db.deleteFood)
// -----------------------------------------------

// ----------------- Review Food -----------------
app.post("/review", db.createReview)
app.get("/reviews/:id", db.getReviews)
// -----------------------------------------------

// ----------------- Share Food -----------------
app.post("/share", db.createShare)
app.get("/sharese/:id", db.getSharese)
// ----------------------------------------------

// Listen to Port 3000
app.listen(port, () => {
    console.log(`Backend App Running on Port: ${port}`)
})
