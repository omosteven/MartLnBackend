const router = require("express");

const baseRouter = router();

const profileRouter = router();

const ProfileController = require("../controllers/ProfileController");

profileRouter.post("/fetch/", ProfileController.fetch);

profileRouter.post("/update/", ProfileController.update);

baseRouter.use("/", profileRouter);

module.exports = baseRouter;
