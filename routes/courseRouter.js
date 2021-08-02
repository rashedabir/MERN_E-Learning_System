const router = require("express").Router();
const courseCtrl = require("../controllers/courseCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/courses")
  .get(courseCtrl.getCourses)
  .post(auth, authAdmin, courseCtrl.createCourse);
router
  .route("/courses/:id")
  .put(auth, authAdmin, courseCtrl.updateCourse)
  .delete(auth, authAdmin, courseCtrl.deleteCourse);

module.exports = router;
