const { register, login } = require("../controllers/authControllers");
const { checkUser } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post("/user", userController);

module.exports = router;
