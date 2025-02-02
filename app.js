const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = 3000;
const dbconnection = require("./config/DBconnection.js");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/users/usersRoutes.js");
const productRoutes = require("./routes/products/productRoutes.js");
const emailrouter = require("./routes/emailRoutes/emailRoutes.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/email", emailrouter);

//connect to the database mongodb
dbconnection();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port: ${PORT}`);
});