const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validateFields } = require("../middlewares/validate-fields");
const { login, register, renewToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  login
);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  register
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
