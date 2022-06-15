const express = require("express");
const sqlite3 = require("sqlite3"); //importação para ter acesso ao banco de dados dos funcionários 
// import { getAll, createEmployee, getEmployee, deleteEmployee, patchEmployee } from "../controllers/employees.js";

// const getAll = require("../controllers/employees.js");

const router = express.Router();

//all routes in here are starting with /employees
router.get("/", (_req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    var sql = 'SELECT * FROM employees ORDER BY id';

    var db = new sqlite3.Database("./data/main.db"); //abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        res.json(rows);
    });
    db.close(); //fecha o banco
});

// router.post("/", createEmployee);

// // router.get("/:id", getEmployee);

// router.delete("/:id", deleteEmployee);

// router.patch("/:id", patchEmployee);

// export default router;
// module.exports = router;