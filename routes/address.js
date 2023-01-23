const router = require("express").Router();
const pool = require("../db");


router.post("/add", async (req, res) => {
    const {street,city,province} = req.body;
    try {
        const sql=`INSERT INTO public.address(
            street, city, province)
            VALUES ($1, $2, $3) returning *;`
    
        const rs = await pool.query(sql,[street,city,province])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});


router.get("/select/:id", async (req, res) => {
    try {
        const sql=`SELECT address_id, street, city, province
        FROM public.address
        where "street" =$1;`;
    
        const rs = await pool.query(sql,[req.params.id])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});

//delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const sql=`DELETE FROM public.address
        WHERE "address_id" = $1;`
    
        const rs = await pool.query(sql,[req.params.id])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});
router.put("/update/:id", async (req, res) => {
    const {street,city,province} = req.body;
    try {
        
        const sql=`UPDATE public.address
        SET street=$2, city=$3, province=$4
        WHERE "address_id" = $1 returning *;`
    
        const rs = await pool.query(sql,[req.params.id,street,city,province])
        
        res.json(rs.rows)
    } catch (error) {
        res.json(error.message)
    }
});


module.exports = router;