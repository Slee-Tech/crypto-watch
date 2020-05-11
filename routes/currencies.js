const express = require("express");
const router = express.Router();

// currency model
const Currency = require("../models/Currency");
const passport = require("../passportConfig");

// get all spots - will add token for auth later // added auth just to test, may remove later
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // since it is going through auth middleware, you will want to get spots only for the user requesting
        // update the find later
        //Spots.aggregate([{ $match: { user: req.user.id } }]);
        Currency.find()
            .where("user")
            .equals(req.user.id) // just added this
            .sort({ date: -1 })
            .then((currencies) => res.json(currencies))
            .catch((err) => res.json(err));
    }
);

// add a spot
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const currency = new Currency({
            name: req.body.name,
            currencyId: req.body.currencyId,
            logoUrl: req.body.logoUrl,
            user: req.user.id, // added this
        });
        currency
            .save()
            .then((cur) => res.json(cur))
            .catch((err) =>
                res.status(404).json({ message: "Error adding currency." })
            );
    }
);

module.exports = router;
