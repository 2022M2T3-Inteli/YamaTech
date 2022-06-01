import sqlite3 from "sqlite3";


export const getAll = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    var sql = 'SELECT * FROM employees ORDER BY id';

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        res.json(rows);
    });
    db.close(); //fecha o banco
}

export const createEmployee = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    var sql = "INSERT INTO employees (full_name, position, legal_hours, total_hours, allocated_hours, outsourced, local, isActive) VALUES ('" + req.body.full_name + "', '" + req.body.position + "', '" + req.body.legal_hours + "', '" + req.body.total_hours + "', '" + req.body.allocated_hours + "',  '" + req.body.outsourced + "', '" + req.body.local + "', '" + req.body.isActive + "')";

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    db.close(); //fecha o banco
    res.send("Funcionário foi adicionado ao banco de dados.");
    res.end();
}

export const getEmployee = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { id } = req.params;

    var sql = `SELECT * FROM employees WHERE id=${id}`;

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        res.json(rows);
    });
    db.close(); //fecha o banco
}

export const deleteEmployee = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { id } = req.params;

    var sql = `DELETE FROM employees WHERE id=${id}`;

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    db.close(); //fecha o banco
    res.send("Funcionário foi removido do banco de dados.");
    res.end();
}

export const patchEmployee = (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

    var params = req.params;
    var body = req.body;
    var sql;

    if (body.full_name) sql = `UPDATE employees SET full_name="${body.full_name}" WHERE id=${params.id}`;
    if (body.position) sql = `UPDATE employees SET position="${body.position}" WHERE id=${params.id}`;
    if (body.legal_hours) sql = `UPDATE employees SET legal_hours="${body.legal_hours}" WHERE id=${params.id}`;
    if (body.total_hours) sql = `UPDATE employees SET total_hours="${body.total_hours}" WHERE id=${params.id}`;
    if (body.allocated_hours) sql = `UPDATE employees SET allocated_hours="${body.allocated_hours}" WHERE id=${params.id}`;
    if (body.outsourced) sql = `UPDATE employees SET outsourced="${body.outsourced}" WHERE id=${params.id}`;
    if (body.local) sql = `UPDATE employees SET local="${body.local}" WHERE id=${params.id}`;
    if (body.isActive) sql = `UPDATE employees SET isActive="${body.isActive}" WHERE id=${params.id}`;
	
    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        res.send("Funcionário foi atualizado");
		res.end();
	});
	db.close(); // Fecha o banco
}