import express from "express"
import bodyparser from "body-parser"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import routes from "./routers/index.js"
import errorHandler from "./middlewares/error.js"
import passport from "passport"
//import Redis from "ioredis"
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/documentation.js";


dotenv.config()
const app = express()

app.use(cookieParser());
app.use(bodyparser.json())
app.use(passport.initialize())

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes)
app.use("*", (req, res) => {
    res.send("Requested resource not found")
})
app.use(errorHandler)

export default app
