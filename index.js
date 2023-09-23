import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";

const app = express();
const port = process.env.PORT || 5000;

//set up view engine
configViewEngine(app);

//init web route
initWebRoute(app)

app.use(express.json())

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})