import mygroupController from "../controller/controllers.mygroupController"
import express from "express";
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", mygroupController.getMyGroup);

    router.post("/20110352/:id", mygroupController.addGroupMember)

    router.get("/20110352/:id", mygroupController.getMyGroupById)

    router.get("/message/:id", mygroupController.getNameById)
    return app.use("/", router);
}

export default initWebRoute;
