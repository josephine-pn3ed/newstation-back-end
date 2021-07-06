import { Payload, Id, INews } from "../../model/News/types";

const News = require("../../model/News");

module.exports = {
  getNewsByCompany: async (id: Id) => {
    try {
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

      if (!news.length) return "No news found!";
      return news;
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  getNewsById: async (id: Id) => {
    try {
      const data = await News.getNewsById("News", id);

      if (!data) return "No news found!";
      return data;
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  insertNews: async (payload: Payload) => {
    
    try {
      const data = await News.insertNews("News", {
        ...payload,
        status: "Active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (!data.inserted) return "News not added!";
      return true;
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  updateNews: async (id: Id, payload: Payload) => {
    try {
      const data = await News.updateNews("News", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });

      if (!data.replaced) return "News not updated!";
      return "News updated successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  deleteNews: async (id: Id) => {
    try {
      const data = await News.deleteNews("News", id, {
        status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) return "News not deleted!";
      return "News deleted successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
};
