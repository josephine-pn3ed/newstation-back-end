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
    const { company_id } = req.params;
    const result = await getNewsByCompany(company_id);
    return res.send(result);
  }
);

route.get(
  "/news-company/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await getNewsById(id);
    return res.send(result);
  }
);

route.post("/news", async (req: express.Request, res: express.Response) => {
  if (!req.body) return res.send("Invalid credentials.");
  const { topic, body, user_id, company_id } = req.body;
  if (!topic) return res.send("News topic is empty.");
  if (!body) return res.send("News body is empty.");
  if (!user_id) return res.send("User id is empty.");
  if (!company_id) return res.send("Company id is empty.");

  const result = await insertNews(req.body);
  return res.send(result);
});

route.put("/news/:id", async (req: express.Request, res: express.Response) => {
  if (!req.body) return res.send("Invalid credentials.");
  const { topic, body, user_id, company_id } = req.body;
  if (!topic) return res.send("News topic is empty.");
  if (!body) return res.send("News body is empty.");
  if (!user_id) return res.send("User id is empty.");
  if (!company_id) return res.send("Company id is empty.");

  const { id } = req.params;
  
  const result = await updateNews(id, req.body);
  return res.send(result);
});

route.delete(
  "/news/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const result = await deleteNews(id);
    return res.send(result);
  }
);

module.exports = route;
