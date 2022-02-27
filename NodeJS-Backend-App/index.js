// Swagger UI
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

// Express
const express = require("express")
const bodyParser = require("body-parser")

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
app.get("/users", db.getUsers)
app.post("/user", db.createUser)
app.put("/user/:id", db.updateUser)

// Listen to Port 3000
app.listen(port, () => {
    console.log(`Backend App Running on Port: ${port}`)
})
