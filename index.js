import app from "./src/app.js";


const port = process.env.PORT || 3000;
app.listen(port, (res, req) => {
    console.log(`server listening at port ${port}`);
})