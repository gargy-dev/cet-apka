const Spravy = require("../model/spravaModel.js");

module.exports.pridatSpravu = async (req, res, next) => {
    try
    {
        const { od, pre, sprava } = req.body;
        const data = await Spravy.create({
            sprava: { text: sprava },
            uzivatelia: [ od, pre ],
            odosielatel: od
        });

        if(data)
        {
            return res.json({ msg: "Správa bola úspešne pridaná" });
        }

        else
        {
            return res.json({ msg: "Správu sa nepodarilo úspešne pridať do databázy" });
        }
    }

    catch (ex)
    {
        next(ex);
    }
}

module.exports.ziskatVsetkySpravy = async (req, res, next) => {
    try
    {
        const { od, pre } = req.body;
        const spravy = await Spravy.find({
            uzivatelia: {
                $all: [od, pre]
            }
        }).sort({ updatedAt: 1 });

        const planovaneSpravy = spravy.map((msg) => {
            return {
                odSeba: msg.odosielatel.toString() === od,
                sprava: msg.sprava.text
            };
        });
        res.json(planovaneSpravy);
    }

    catch (ex)
    {
        next(ex);
    }
}