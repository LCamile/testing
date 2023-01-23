const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

// middle ware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//subrouting
app.use("/address",require("./routes/address"))
app.use("/employee",require("./routes/employee"))
//route
app.get("/", (req, res) => {
    res.send("Hello World")
});


//create_port
const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{
console.log(`server: ${PORT}` );
});
