const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  projects.push(req.body);

  req.projects = req.body;

  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (let prop in projects) {
    const idProject = projects[prop].id;
    if (idProject === id) {
      projects[prop].tasks.push(title);
      req.projects = projects;
    }
  }

  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (let prop in projects) {
    const idProject = projects[prop].id;
    if (idProject === id) {
      projects[prop].title = title;
      req.projects = projects;
    }
  }

  return res.json(projects);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  for (let prop in projects) {
    const idProject = projects[prop].id;
    if (idProject === id) {
      projects.splice(prop, 1);
    }
  }

  return res.send();
});

server.listen(3000);
