import express = require('express')
const route = express.Router();
const { getEmployee, insertEmployee, updateEmployee, deleteEmployee } = require('../controller/Employee');

route.get('/', async (req: express.Request, res: express.Response) => {
    res.send(`<center><h1> Welcome!</h1></center>`);
})

route.get('*', async (req: express.Request, res: express.Response) => {
    res.status(404).send(`<center><h1> 💀 Please Try Again. HTTP ERROR 404! <br> 😔 PAGE DOES NOT EXIST!!!! </h1></center>`);
})

route.get('/employee', async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    console.log("Accessed READ route");
    const result = await getEmployee(email, password);
    console.log(result)
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" })
})

route.post('/employee', async (req: express.Request, res: express.Response) => {
    const result = await insertEmployee(req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.put('/employee/:id', async (req: express.Request, res: express.Response) => {
    const result = await updateEmployee(req.params.id, req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.delete('/employee/:id', async (req: express.Request, res: express.Response) => {
    const result = await deleteEmployee(req.params.id);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})


module.exports = route;