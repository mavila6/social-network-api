// Requires express and mongoose
const express = require("express");
const mongoose = require("mongoose");
// saves express into a variable and sets port to 3001
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('debug', true);
// sends console message when server is initiated
app.listen(PORT, () => {
    console.log(`App is now listening on localhost ${PORT}`);
});