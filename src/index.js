import app from "./app.js";



const port = process.env.PORT || 3000;
app.listen(port, (res, req) => {
    console.log(`server listening at port ${port}`);
    console.log(`Swagger docs available at ${`http://localhost:8000/docs`}`);
})