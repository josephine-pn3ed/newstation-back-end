import express = require('express')
const route = express.Router();
const { getNews, insertNews, updateNews, deleteNews } = require('../controller/News');

route.get('/', async (req: express.Request, res: express.Response) => {
    res.send(`<center><h1> Welcome!</h1></center>`);
})

route.get('*', async (req: express.Request, res: express.Response) => {
    res.status(404).send(`<center><h1> 💀 Please Try Again. HTTP ERROR 404! <br> 😔 PAGE DOES NOT EXIST!!!! </h1></center>`);
})

route.get('/News/:company_id', async (req: express.Request, res: express.Response) => {

    console.log("Accessed READ route");
    const result = await getNews(req.params.company_id);
    console.log(result)
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" })
})

route.post('/News', async (req: express.Request, res: express.Response) => {
    const result = await insertNews(req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.put('/News/:id', async (req: express.Request, res: express.Response) => {
    const result = await updateNews(req.params.id, req.body);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})

route.delete('/News/:id', async (req: express.Request, res: express.Response) => {
    const result = await deleteNews(req.params.id);
    return result ? res.send({ "status": "Success" }) : res.send({ "status": "Failed" });
})


module.exports = route;