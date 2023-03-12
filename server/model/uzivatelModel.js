const mongoose = require("mongoose");

const uzivatelSchema = new mongoose.Schema({
    uzivatelske_meno: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true   
    },

    email: {
        type: String,
        // required: true,
        unique: true,
        max: 50
    },

    heslo: {
        type: String,
        required: true,
        min: 8
    },

    jeProfilovaFotkaNastavena: {
        type: Boolean,
        default: false
    },

    profilovaFotka: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("Uzivatelia", uzivatelSchema, "uzivatelia");