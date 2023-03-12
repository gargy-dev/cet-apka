const mongoose = require("mongoose");

const spravaSchema = new mongoose.Schema(
  {
    sprava: {
      text: {
        type: String,
        required: true,
      },
    },
    uzivatelia: Array,
    odosielatel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uzivatel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Spravy", spravaSchema, "spravy");
