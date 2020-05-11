require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("./passportConfig");
// db config
const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }) // Adding new mongo url parser
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(passport.initialize());

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/auth");
const currencyRoutes = require("./routes/currencies");
// const spot_routes = require("./routes/api/spots");
//use routes in spots dir, auth
// app.use("/api/spots", spot_routes);
app.use("/auth", authRoutes);
app.use("/currencies", currencyRoutes);

const spots_test = [
    { id: 1, spotName: "John", lastName: "Doe" },
    { id: 2, spotName: "Brad", lastName: "Traversy" },
    { id: 3, spotName: "Mary", lastName: "Swanson" },
];

/*app.get("/api/customers", (req, res) => {
        res.json(spots);
    });*/

app.get("/", (req, res) => {
    res.send("GET request to the homepage");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
