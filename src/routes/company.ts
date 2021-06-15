import express = require('express')
const route = express.Router();
const { getCompany, insertCompany, updateCompany, deleteCompany } = require('../controller/Company');

route.get('/', async (req: express.Request, res: express.Response) => {
  res.send(`<center><h1> Welcome!</h1></center>`);
})

// route.get('*', async (req: express.Request, res: express.Response) => {
//   res.status(404).send(`<center><h1> 💀 Please Try Again. HTTP ERROR 404! <br> 😔 PAGE DOES NOT EXIST!!!! </h1></center>`);
// })

route.get('/company', async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  console.log("Accessed READ route");
  const result = await getCompany(email, password);
  console.log(result)
  return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" })
})

route.post('/company', async (req: express.Request, res: express.Response) => {
  const result = await insertCompany(req.body);
  console.log("Company Registered")
  return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.put('/company/:id', async (req: express.Request, res: express.Response) => {
  const result = await updateCompany(req.params.id, req.body);
  console.log("Company Update Route")
  return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.delete('/company/:id', async (req: express.Request, res: express.Response) => {
  const result = await deleteCompany(req.params.id);
  console.log("Company Delete Route")
  return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})


module.exports = route;