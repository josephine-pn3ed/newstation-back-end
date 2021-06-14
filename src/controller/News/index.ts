import { Payload, Id } from '../../model/News/types';

const Company = require('../../model/Company');

module.exports = {
    getNews: async (company_id: Id) => {
        try {
            const data = await Company.getNews("News", company_id);
            if (data) {
                return true;
            } else throw Error;
        } catch (error) {
            return false;
        }
    },
    insertNews: async (payload: Payload) => {
        try {
            const data = await Company.insertNews("News",
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
            const data = await Company.updateNews("News", {
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
            const data = await Company.deleteEmployee("News", id, {
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