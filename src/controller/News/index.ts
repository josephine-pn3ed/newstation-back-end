import { Payload, Id } from "../../model/News/types";

const News = require("../../model/News");

module.exports = {
  getNewsByCompany: async (id: Id) => {
    try {
      const data = await News.getNewsByCompany("News", id);

      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  getNewsById: async (id: Id) => {
    try {
      const data = await News.getNewsById("News", id);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertNews: async (payload: Payload) => {
    try {
      const data = await News.insertNews("News", {
        ...payload,
        news_status: "Active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  updateNews: async (id: Id, payload: Payload) => {
    try {
      const data = await News.updateNews("News", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  deleteNews: async (id: Id) => {
    try {
      const data = await News.deleteNews("News", id, {
        news_status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
};
