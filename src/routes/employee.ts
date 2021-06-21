import express = require('express')
const route = express.Router();
const { getEmployees, getEmployeeById, insertEmployee, updateEmployee, updateEmployeeByStatus, deleteEmployee } = require('../controller/Employee');

route.get('/employee', async (req: express.Request, res: express.Response) => {
    const result = await getEmployees();
    return result ? res.send(result) : res.send({ "status": "Failed" })
})

route.get('/employee/:id', async (req: express.Request, res: express.Response) => {
    const result = await getEmployeeById(req.params.id);
    return result ? res.send(result) : res.send({ "status": "Failed" })
})


route.post('/employee', async (req: express.Request, res: express.Response) => {
    const result = await insertEmployee(req.body);
    return result ? res.send({ "success": true, "message": result.message }) : res.send({ "success": false });
})

route.put('/employee/:id', async (req: express.Request, res: express.Response) => {
    console.log('updating....')
    const result = await updateEmployee(req.params.id, req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.put('/employee/restore/:id', async (req: express.Request, res: express.Response) => {
    const result = await updateEmployeeByStatus(req.params.id);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.delete('/employee/:id', async (req: express.Request, res: express.Response) => {
    const result = await deleteEmployee(req.params.id);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})


module.exports = route;