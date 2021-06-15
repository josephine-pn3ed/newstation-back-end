import express = require('express')
const route = express.Router();
const { getViewers, insertViewers, updateViewers, deleteViewers } = require('../controller/Viewers');

route.get('/viewers/:news_id', async (req: express.Request, res: express.Response) => {
    console.log("Accessed READ route");
    const result = await getViewers(req.params.news_id);
    console.log(result)
    return result.length ? res.send({ status: "Success", result }) : res.send({ "status": "Failed" })
})


route.post('/viewers', async (req: express.Request, res: express.Response) => {
    const result = await insertViewers(req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.put('/viewers/:id', async (req: express.Request, res: express.Response) => {
    const result = await updateViewers(req.params.id, req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.delete('/viewers/:id', async (req: express.Request, res: express.Response) => {
    const result = await deleteViewers(req.params.id);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})



module.exports = route;