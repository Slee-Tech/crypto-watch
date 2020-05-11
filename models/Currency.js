const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    currencyId: {
        type: String,
    },
    logoUrl: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = Currency = mongoose.model("currency", CurrencySchema);
