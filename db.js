const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://prahlad:prahlad@socialappcluster.igiyj67.mongodb.net/social-app', { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection

connection.on("connected", () => {
    console.log("Mongodb connected");
})

connection.on("error", () => {
    console.log("Error on connecting mongo db");
})