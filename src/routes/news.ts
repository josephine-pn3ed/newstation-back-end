import express = require("express");
const route = express.Router();
const {
  getNewsByCompany,
  getNewsById,
  insertNews,
  updateNews,
  deleteNews,
} = require("../controller/News");

route.get(
  "/news/:company_id",
  async (req: express.Request, res: express.Response) => {
    const result = await getNewsByCompany(req.params.company_id);
    return res.send(result);
  }
);

route.get(
  "/news-company/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await getNewsById(req.params.id);
    return res.send(result);
  }
);

route.post("/news", async (req: express.Request, res: express.Response) => {
  const result = await insertNews(req.body);
  return res.send(result);
});

route.put("/news/:id", async (req: express.Request, res: express.Response) => {
  const result = await updateNews(req.params.id, req.body);
  return res.send(result);
});

route.delete(
  "/news/:id",
  async (req: express.Request, res: express.Response) => {
    const result = await deleteNews(req.params.id);
    return res.send(result);
  }
);

module.exports = route;
