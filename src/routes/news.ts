import express = require('express')
const route = express.Router();
const { getNews, insertNews, updateNews, deleteNews } = require('../controller/News');

route.get('/news/:company_id', async (req: express.Request, res: express.Response) => {
    console.log("Accessed READ route");
    const result = await getNews(req.params.company_id);
    console.log(result)
    return result.length ? res.send({ status: "Success", result }) : res.send({ "status": "Failed" })
})

route.post('/news', async (req: express.Request, res: express.Response) => {
    console.log("Accessed POST route");
    const result = await insertNews(req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.put('/news/:id', async (req: express.Request, res: express.Response) => {
    const result = await updateNews(req.params.id, req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.delete('/news/:id', async (req: express.Request, res: express.Response) => {
    console.log("Accessed DELETE route");
    const result = await deleteNews(req.params.id);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})


module.exports = route;