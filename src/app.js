import express from "express"
import bodyparser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import routes from "./routers/index.js"
import errorHandler from "./middlewares/error.js"


dotenv.config()
const app = express()
app.use(cookieParser());
app.use(bodyparser.json())
app.use(routes)
app.use("*", (req, res)=>{
    res.send("Requested resource not found")
})
app.use(errorHandler)

export default app