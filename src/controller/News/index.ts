import { Payload, Id, Table } from '../../model/News/types';

const News = require('../../model/News');

module.exports = {
    getNews: async (id: Id) => {
        try {
            console.log("controller")
            const data = await News.getNews("News", id);
            if (data) {
                return data;
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
        }
        catch (error) {
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
        }
        catch (error) {
            return false;
        }
    },
}