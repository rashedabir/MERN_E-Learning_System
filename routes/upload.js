const router = require("express").Router();
const uploadCtrl = require("../controllers/uploadCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/upload", auth, authAdmin, uploadCtrl.uploadFile);
router.post("/destroy", auth, authAdmin, uploadCtrl.deleteFile);

module.exports = router;
