import { Payload, Id } from '../../model/News/types';

const News = require('../../model/News');

module.exports = {
    getNews: async (news_id: Id) => {
        try {
            const data = await News.getNews("News", news_id);
            if (data) {
                return true;
            } else throw Error;
        } catch (error) {
            return false;
        }
    },
    insertNews: async (payload: Payload) => {
        try {
            const data = await News.insertNews("News",
                {
                    ...payload,
                    created_date: new Date().toISOString(),
                    updated_date: new Date().toISOString(),
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
            const data = await News.updateNews("News", {
                ...payload,
                updated_date: new Date().toISOString(),
            });
            if (data) {
                return data;
            } else throw Error;
        }
        catch (error) {
            return false;
        }
    },
    deleteNews: async (id: Id) => {
        try {
            const data = await News.deleteEmployee("News", id, {
                status: "Inactive",
                updated_date: new Date().toISOString(),
            });
            if (data) {
                return data;
            } else throw Error;
        }
        catch (error) {
            return false;
        }
    },
}