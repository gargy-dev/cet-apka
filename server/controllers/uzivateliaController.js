const Uzivatel = require("../model/uzivatelModel.js");
const bcrypt = require("bcrypt");

module.exports.registracia = async (req, res, next) => {
  try {
    const { uzivatelske_meno, email, heslo } = req.body;

    const uzivatelske_menoKontrola = await Uzivatel.findOne({
      uzivatelske_meno,
    });
    if (uzivatelske_menoKontrola) {
      return res.json({ msg: "Užívateľské meno už existuje!", status: false });
    }

    const emailKontrola = await Uzivatel.findOne({ email });
    if (emailKontrola) {
      return res.json({ msg: "E-mail už existuje!", status: false });
    }

    const hashovaneHeslo = await bcrypt.hash(heslo, 10);

    const uzivatel = await Uzivatel.create({
      email,
      uzivatelske_meno,
      heslo: hashovaneHeslo,
    });

    delete uzivatel.heslo;
    return res.json({ status: true, uzivatel });

    // console.log(req.body);
  } catch (ex) {
    next(ex);
  }
};

module.exports.prihlasenie = async (req, res, next) => {
  try {
    const { uzivatelske_meno, heslo } = req.body;

    const uzivatel = await Uzivatel.findOne({ uzivatelske_meno });
    if (!uzivatel) {
      return res.json({
        msg: "Užívateľské meno alebo heslo je nesprávne!",
        status: false,
      });
    }
    const jeHesloSpravne = await bcrypt.compare(heslo, uzivatel.heslo);
    if (!jeHesloSpravne) {
      return res.json({
        msg: "Užívateľské meno alebo heslo je nesprávne!",
        status: false,
      });
    }
    delete uzivatel.heslo;
    return res.json({ status: true, uzivatel });

    // console.log(req.body);
  } catch (ex) {
    next(ex);
  }
};

module.exports.firebasePrihlasenie = async (req, res, next) => {
  try {
    const { email } = req.body;
    const uzivatel = await Uzivatel.findOne({ email });
    if (uzivatel) {
      delete uzivatel.heslo;
      return res.json({ status: true, uzivatel });
    } else {
      return res.json({
        status: false,
        msg: "E-mail sa nenašiel v databáze, vitajte nový užívateľ!",
      });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.skontrolujUzivatelskeMeno = async (req, res, next) => {
  try {
    const { uzivatelske_meno } = req.body;
    const uzivatel = await Uzivatel.findOne({ uzivatelske_meno });
    if (uzivatel) {
      return res.json({
        status: false,
        msg: "Užívateľské meno nie je k dispozícii",
      });
    } else {
      return res.json({
        status: true,
        msg: "Užívateľské meno je dostupné",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports.nastavitAvatar = async (req, res, next) => {
  try {
    const uzivatelId = req.params.id;
    const profilovaFotka = req.body.image;
    const uzivatelData = await Uzivatel.findByIdAndUpdate(
      uzivatelId,
      {
        jeProfilovaFotkaNastavena: true,
        profilovaFotka,
      },
      { new: true }
    );

    return res.json({
      suNastavene: uzivatelData.jeProfilovaFotkaNastavena,
      image: uzivatelData.profilovaFotka,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.nacitajVsetkychUzivatelov = async (req, res, next) => {
  try {
    const uzivatelia = await Uzivatel.find({
      _id: { $ne: req.params.id },
    }).select(["email", "uzivatelske_meno", "profilovaFotka", "_id"]);
    return res.json(uzivatelia);
  } catch (ex) {
    next(ex);
  }
};

module.exports.odhlasenie = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "ID užívateľa je povinné" });
      onlineUzivatelia.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };