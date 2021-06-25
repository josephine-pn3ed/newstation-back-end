import { Payload, Id, INews } from "../../model/News/types";

const News = require("../../model/News");

module.exports = {
  getNewsByCompany: async (id: Id) => {
    try {
      const data = await News.getNewsByCompany("News", id);
      let news: INews[] = [];
      data.map((value: any) => {
        const { left, right } = value;
        const { id, news_body, news_status, news_topic, updated_at, user_id } =
          left;
        const { user_first_name, user_middle_name, user_last_name } = right;
        news = [
          ...news,
          {
            id: id,
            user_id: user_id,
            news_body: news_body,
            news_topic: news_topic,
            news_status: news_status,
            updated_at: updated_at,
            user_first_name: user_first_name,
            user_middle_name: user_middle_name,
            user_last_name: user_last_name,
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

      if (news) {
        return news;
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
