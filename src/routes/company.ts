import express = require('express')
const route = express.Router();
const { getCompany, insertCompany, login } = require('../controller/Company');

route.get('/company/:id', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const result = await getCompany(id);
  return result ? res.send({ result }) : res.send(false);
})

route.post('/company', async (req: express.Request, res: express.Response) => {
  const result = await insertCompany(req.body);
  return result ? res.send({ "success": true, "message": result.message }) : res.send({ "success": false })
})

route.post('/login', async (req: express.Request, res: express.Response) => {
  const result = await login(req.body);
  return result ? res.send({ "success": true, "message": result.message , "user": result.user, "email": result.email, "id": result.id }) : res.send({ "success": false, "message": result.message })
})

module.exports = route;
