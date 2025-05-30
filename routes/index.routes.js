const router = require("express").Router();
const stageRouter = require("./stage.routes");
const statusRouter = require("./status.routes");
const roleRouter = require("./role.routes");
const branchRouter = require("./branch.routes");
const groupRouter = require("./group.routes");
const deviceRouter = require("./device.routes");
const lidRouter = require("./lid.routes");
const studentRouter = require("./student.routes");
const paymentRouter = require("./payment.routes");
const lessonRouter = require("./lesson.routes");
const studentLessonRouter = require("./student_lesson.routes");
const studentGroupRouter = require("./student_group.routes");
const otpRouter = require("./otp.routes");
const stuffRouter = require("./stuff.routes");
const stuffRoleRouter = require("./stuff_role.routes");
const groupStuffRouter = require("./group_stuff.routes");

router.use("/otp", otpRouter);
router.use("/stage", stageRouter);
router.use("/status", statusRouter);
router.use("/role", roleRouter);
router.use("/branch", branchRouter);
router.use("/group", groupRouter);
router.use("/device", deviceRouter);
router.use("/lid", lidRouter);
router.use("/student", studentRouter);
router.use("/payment", paymentRouter);
router.use("/lesson", lessonRouter);
router.use("/student-lesson", studentLessonRouter);
router.use("/student-group", studentGroupRouter);
router.use("/stuff", stuffRouter);
router.use("/stuff-role", stuffRoleRouter);
router.use("/group-stuff", groupStuffRouter);

module.exports = router;
