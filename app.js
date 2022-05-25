import express from "express";
import bodyParser from "body-parser";

import employeesRoutes from "./routes/employees.js";
import projectsRoutes from "./routes/projects.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("src/frontend"));
app.use("/employees", employeesRoutes);
app.use("/projects", projectsRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));