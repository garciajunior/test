const routes = require("express").Router();
const { User } = require("./app/models");
const authMiddleware =require("./app/middleware/auth");
const SessionController = require("./app/Controllers/SessionController");

 User.create({
  name: 'root',
  email:'root@example.com',
  password: 'root'
});



routes.post("/sessions", SessionController.store);
routes.use(authMiddleware);
routes.get('/dashboard', (req, res) => {
  res.status(200).send();
})

module.exports = routes;
