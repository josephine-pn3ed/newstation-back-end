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
  if (!req.body) return "Invalid credentials.";
  const { topic, body, user_id, company_id } = req.body;
  if (!topic) return "News topic is empty.";
  if (!body) return "News body is empty.";
  if (!user_id) return "User id is empty.";
  if (!company_id) return "Company id is empty.";
  
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
