import express = require('express')
const route = express.Router();
const { getNewsByCompany, getNewsById, insertNews, updateNews, deleteNews } = require('../controller/News');

route.get('/news/:company_id', async (req: express.Request, res: express.Response) => {
    const result = await getNewsByCompany(req.params.company_id);
    return result ? res.send({ "success": true, "news": result.data, "company": result.company }) : res.send({ "success": false })
})

route.get('/news-company/:id', async (req: express.Request, res: express.Response) => {
    const result = await getNewsById(req.params.id);
    return result ? res.send({ "success": true, result }) : res.send({ "success": false })
})

route.post('/news', async (req: express.Request, res: express.Response) => {
    const result = await insertNews(req.body);
    return result ? res.send({ "success": true }) : res.send({ "success": false });
})

route.put('/news/:id', async (req: express.Request, res: express.Response) => {
    const result = await updateNews(req.params.id, req.body);
    return result ? res.send({ "success": true }) : res.send({ "success": false });
})

route.delete('/news/:id', async (req: express.Request, res: express.Response) => {
    const result = await deleteNews(req.params.id);
    return result ? res.send({ "success": true }) : res.send({ "success": false });
})


module.exports = route;