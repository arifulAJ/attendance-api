const router = require("express").Router();
const userRoute = require("./users");
const authRouter = require("./auth");
const adminAttendancesRoutes = require("./admin-attendance");
const studentAttendancesRoutes = require("./students-attendance");

const authenticate = require("../middleware/authenticate");

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", authenticate, userRoute);
router.use("/api/v1/admin/attendance", authenticate, adminAttendancesRoutes);
router.use(
  "/api/v1/student/attendance",
  authenticate,
  studentAttendancesRoutes
);

module.exports = router;
