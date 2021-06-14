import express = require('express')
const route = express.Router();
const { getAllEmployees, getAllCompanies, putEmployee, deleteEmployee, updatePayloadEmployee, postNews, displayNews } = require('../controller/newstation');

route.get('/', async (req: express.Request, res: express.Response) => {
    res.status(404).send(`<center><h1> 💀 Please Try Again. HTTP ERROR 404! <br> 😔 PAGE DOES NOT EXIST!!!! </h1></center>`);
})


route.get('/EmployeeList/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        console.log("Accessed READ route");
        const data = await getAllEmployees(id);
        console.log(data)
        return data ? res.status(200).send(data) : { status: "ERROR!" }

    } catch (error) {
        return res.status(500).send("Bad Request");
    }
})

route.get('/CompanyList', async (req: express.Request, res: express.Response) => {
    try {
        console.log("Accessed READ route");
        const data = await getAllCompanies();

        return data ? res.status(200).send(data) : { status: "ERROR!" }

    } catch (error) {
        return res.status(500).send("Bad Request");
    }
})
//add employee by company ID
route.put('/AddEmployee/', async (req: express.Request, res: express.Response) => {
    try {

        console.log("Added employee route");
        const data = await putEmployee(req.body);
        return data ? res.status(200).send(data) : { status: "ERROR!" }
    }
    catch (error) {
        return res.status(500).send("Bad Request");
    }
})

route.delete('/DELETE/:employeeId', async (req: express.Request, res: express.Response) => {
    try {
        console.log("Access DELETE route");
        const data = await deleteEmployee(req.params.employeeId);

        return data ? res.status(200).send(data) : { status: "ERROR!" }

    } catch (error) {
        return res.status(500).send("Bad Request");
    }
})

//UPDATE BY NAME , UPDATES STATUS
route.put('/UPDATE/:employeeId', async (req: express.Request, res: express.Response) => {
    try {
        console.log("Access UPDATE STATUS route");
        const data = await updatePayloadEmployee(req.params.employeeId, req.body);
        return data ? res.status(200).send(data) : { status: "ERROR!" }
    }
    catch (error) {
        return res.status(500).send("Bad Request");
    }
})

route.put('/AddNews/', async (req: express.Request, res: express.Response) => {
    try {

        console.log("Add News Route");
        const data = await postNews(req.body);
        return data ? res.status(200).send(data) : { status: "ERROR!" }
    }
    catch (error) {
        return res.status(500).send("Bad Request");
    }
})

route.get('/News/', async (req: express.Request, res: express.Response) => {
    try {
        console.log("NEWS route");
        const data = await displayNews();
        console.log(data)
        return data ? res.status(200).send(data) : { status: "ERROR!" }

    } catch (error) {
        return res.status(500).send("Bad Request");
    }
})






module.exports = route;