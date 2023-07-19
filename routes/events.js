const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");

const {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controllers/events");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");
const router = Router();

router.use(validateJWT);

//Obtener eventos
router.get("/", getEvents);

//Crear eventos
router.post(
  "/",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
  ],
  validateFields,
  createEvents
);

//Actualizar evento
router.put(
  "/:id",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
  ],
  validateFields,
  updateEvents
);

//Borrar eventos
router.delete("/:id", deleteEvents);

module.exports = router;
