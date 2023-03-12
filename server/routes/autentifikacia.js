const {
  registracia,
  prihlasenie,
  odhlasenie,
  nastavitAvatar,
  nacitajVsetkychUzivatelov,
  firebasePrihlasenie,
  skontrolujUzivatelskeMeno,
} = require("../controllers/uzivateliaController.js");

const router = require("express").Router();

router.post("/registracia", registracia);
router.post("/prihlasenie", prihlasenie);
router.post("/firebase-prihlasenie", firebasePrihlasenie);
router.post("/nastavit-avatar/:id", nastavitAvatar);
router.post("/kontrola-uzivatelske-meno", skontrolujUzivatelskeMeno);
router.get("/vsetci-uzivatelia/:id", nacitajVsetkychUzivatelov);
router.get("/odhlasenie/:id", odhlasenie);

module.exports = router;
