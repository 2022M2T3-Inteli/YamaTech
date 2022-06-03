import express from "express";

import employeesRoutes from "./routes/employees.js";
import projectsRoutes from "./routes/projects.js";
import dashboardRoutes from "./routes/dashboard.js";


const app = express();
const hostname = '127.0.0.1';
const PORT = 3000;

app.use(express.static("src/frontend"));

app.use(express.urlencoded());
app.use(express.json());


app.use("/employees", employeesRoutes);
app.use("/projects", projectsRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));