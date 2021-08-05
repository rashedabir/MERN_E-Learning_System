const router = require("express").Router();
const uploadCtrl = require("../controllers/uploadCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/upload", auth, uploadCtrl.uploadFile);
router.post("/destroy", auth, uploadCtrl.deleteFile);

module.exports = router;
