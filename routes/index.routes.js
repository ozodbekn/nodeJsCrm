const router = require("express").Router();
const stageRouter = require("./stage.routes");
const statusRouter = require("./status.routes");
const roleRouter = require("./role.routes");
const branchRouter = require("./branch.routes");
// const lidRouter = require("./lid.routes");

router.use("/stage", stageRouter);
router.use("/status", statusRouter);
router.use("/role", roleRouter);
router.use("/branch", branchRouter);
// router.use("/lid", lidRouter);

module.exports = router;
