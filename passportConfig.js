const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;
const User = require("./models/User");

const opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY,
};

const strategy = new jwtStrategy(opts, (jwt_payload, next) => {
    console.log(jwt_payload.id);
    User.findById(jwt_payload.id).then((res) => {
        next(null, res);
    });
});

passport.use(strategy);

module.exports = passport;
