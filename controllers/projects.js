import sqlite3 from "sqlite3";

export const getAll = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');

    var sql = 'SELECT * FROM projects ORDER BY id';

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        res.json(rows);
    });
    db.close(); //fecha o banco
}

export const createProject = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    var sql = "INSERT INTO projects (project_name, owner, begin_date, finish_date, id_employees, employees_allocated_hours, local, timeDistribution, monthlyAlloc, isActive) VALUES ('" + req.body.project_name + "', '" + req.body.owner + "', '" + req.body.begin_date + "', '" + req.body.finish_date + "', '" + req.body.id_employees + "',  '" + req.body.employees_allocated_hours + "', '" + req.body.local + "', '" + req.body.timeDistribution + "', '" + req.body.monthlyAlloc + "', '" + req.body.isActive + "')";

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    db.close(); //fecha o banco
    res.send("O projeto foi adicionado ao banco de dados.");
    res.end();
}

export const getProject = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { id } = req.params;

    var sql = `SELECT * FROM projects WHERE id=${id}`;

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.all(sql, [], (err, rows) => {
        if (err) {
        throw err;
        }
        res.json(rows);
    });
    db.close(); //fecha o banco
}

export const deleteProject = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { id } = req.params;

    var sql = `DELETE FROM projects WHERE id=${id}`;

    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    db.close(); //fecha o banco
    res.send("Projeto foi removido do banco de dados.");
    res.end();
}

export const patchProject = (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');

    var params = req.params;
    var body = req.body;
    var sql;

    if (body.project_name) sql = `UPDATE projects SET project_name="${body.project_name}" WHERE id=${params.id}`;
    if (body.owner) sql = `UPDATE projects SET owner="${body.owner}" WHERE id=${params.id}`;
    if (body.begin_date) sql = `UPDATE projects SET begin_date="${body.begin_date}" WHERE id=${params.id}`;
    if (body.finish_date) sql = `UPDATE projects SET finish_date="${body.finish_date}" WHERE id=${params.id}`;
    if (body.id_employees) sql = `UPDATE projects SET id_employees="${body.id_employees}" WHERE id=${params.id}`;
    if (body.employees_allocated_hours) sql = `UPDATE projects SET employees_allocated_hours="${body.employees_allocated_hours}" WHERE id=${params.id}`;
    if (body.local) sql = `UPDATE projects SET local="${body.local}" WHERE id=${params.id}`;
    if (body.timeDistribution) sql = `UPDATE projects SET timeDistribution="${body.timeDistribution}" WHERE id=${params.id}`;
    if (body.monthlyAlloc) sql = `UPDATE projects SET monthlyAlloc="${body.monthlyAlloc}" WHERE id=${params.id}`;
    if (body.isActive) sql = `UPDATE projects SET isActive="${body.isActive}" WHERE id=${params.id}`;
	
    var db = new sqlite3.Database("./data/main.db"); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        res.send("Projeto foi atualizado");
		res.end();
	});
	db.close(); // Fecha o banco

    
}
