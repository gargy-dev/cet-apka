const { pridatSpravu, ziskatVsetkySpravy } = require("../controllers/spravyController.js");

const router = require("express").Router();

router.post("/pridat-spravu/", pridatSpravu);
router.post("/ziskat-spravy/", ziskatVsetkySpravy);

module.exports = router;