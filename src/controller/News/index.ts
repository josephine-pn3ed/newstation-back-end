import { Payload, Id, INews } from "../../model/News/types";

const News = require("../../model/News");

module.exports = {
  getNewsByCompany: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await News.getNewsByCompany("News", id);

      let news: INews[] = [];
      data.map((value: any) => {
        const { left, right } = value;
        const { id, body, status, topic, updated_at, user_id } = left;
        const { first_name, middle_name, last_name } = right;
        news = [
          ...news,
          {
            id: id,
            user_id: user_id,
            body: body,
            topic: topic,
            status: status,
            updated_at: updated_at,
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
          },
        ];
      });

      news.sort((a: INews, b: INews) => {
        const new_a = a.updated_at;
        const new_b = b.updated_at;

        if (new_a > new_b) {
          return -1;
        } else if (new_a == new_b) {
          return 0;
        } else {
          return 1;
        }
      });

      if (!news) throw Error;
      console.log(news)
      return news;
    } catch (error) {
      const { message } = error;

      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return { message: "Database Down!" };
      return false;
    }
  },
  getNewsById: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await News.getNewsById("News", id);

      if (!data) throw Error;
      return data;
    } catch (error) {
      return false;
    }
  },
  insertNews: async (payload: Payload) => {
    try {
      const { topic, body, user_id, company_id } = payload;
      if (!topic || !body || !user_id || !company_id) throw Error;

      const data = await News.insertNews("News", {
        ...payload,
        status: "Active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (!data.inserted) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
  updateNews: async (id: Id, payload: Payload) => {
    try {
      if (!id) throw Error;
      const data = await News.updateNews("News", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });

      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteNews: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await News.deleteNews("News", id, {
        status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
};
