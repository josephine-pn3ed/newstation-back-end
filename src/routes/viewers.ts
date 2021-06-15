import express = require('express')
const route = express.Router();
const { getViewers, insertViewers } = require('../controller/Viewers');

route.get('/', async (req: express.Request, res: express.Response) => {
    res.send(`<center><h1> Welcome!</h1></center>`);
})

route.get('*', async (req: express.Request, res: express.Response) => {
    res.status(404).send(`<center><h1> 💀 Please Try Again. HTTP ERROR 404! <br> 😔 PAGE DOES NOT EXIST!!!! </h1></center>`);
})

route.get('/Viewers/:news_id', async (req: express.Request, res: express.Response) => {

    console.log("Accessed READ route");
    const result = await getViewers(req.params.news_id);
    console.log(result)
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" })
})

route.post('/Viewers', async (req: express.Request, res: express.Response) => {
    const result = await insertViewers(req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})



module.exports = route;