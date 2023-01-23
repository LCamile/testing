const app = require("express").Router();
const pool = require("../db");


//ad employee
app.post("/add", async (req, res) => {
    const {Name} = req.body;
    try {
        const sql=`INSERT INTO public."Employees"(
            "Name")
            VALUES ($1) returning *;`
    
        const rs = await pool.query(sql,[Name])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});

//select id anywhere
app.get("/get/:id", async (req, res) => {
    try {
        const sql=`SELECT "ID", "Name"
        FROM public."Employees"
        where "ID" = $1`
    
        const rs = await pool.query(sql,[req.params.id])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});
app.get("/get", async (req, res) => {
    try {
        const sql=`SELECT "ID", "Name"
        FROM public."Employees"
        order by "ID" DESC;`
    
        const rs = await pool.query(sql)
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const sql=`DELETE FROM public."Employees"
        WHERE "ID" = $1;`
    
        const rs = await pool.query(sql,[req.params.id])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});

app.put("/update/:id", async (req, res) => {
    const {Name} = req.body;

    try {
        
        const sql=`UPDATE public."Employees"
        SET "Name"= $2
        WHERE "ID" = $1;`
    
        const rs = await pool.query(sql,[req.params.id,Name])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});
module.exports = app;