import express = require('express')
const route = express.Router();
const { getCompany, insertCompany, loginCompany } = require('../controller/Company');

route.get('/company', async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const result = await getCompany(id);
  return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" })
})

route.post('/company', async (req: express.Request, res: express.Response) => {
  const result = await insertCompany(req.body);
  return result ? res.send({ "success": true , "message": result.message}) : res.send({ "success": false })
})

route.post('/login', async (req: express.Request, res: express.Response) => {
  const result = await loginCompany(req.body);
  return result ? res.send({ "success": true , "message": result.message}) : res.send({ "success": false, "message": result.message })
})

module.exports = route;