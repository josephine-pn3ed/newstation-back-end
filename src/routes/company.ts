import express = require('express')
const route = express.Router();
const { getCompany, insertCompany } = require('../controller/Company');

route.get('/', async (req: express.Request, res: express.Response) => {
  res.status(404).send(`<center><h1> 💀 Please Try Again. HTTP ERROR 404! <br> 😔 PAGE DOES NOT EXIST!!!! </h1></center>`);
})

route.get('/company', async (req: express.Request, res: express.Response) => {
  const { email, password } = req.params;
  console.log("Accessed READ route");
  const result = await getCompany(email, password);
  console.log(result)
  return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" })
})

route.post('/company', async (req: express.Request, res: express.Response) => {
  const result = await insertCompany(req.body);
  return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" })
})

module.exports = route;