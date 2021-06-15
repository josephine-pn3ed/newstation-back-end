import { Payload, Id, Table } from '../../model/Viewers/types';

const Viewers = require('../../model/Viewers');

module.exports = {
    getViewers: async (table: Table, employee_id: Id) => {
        try {
            const data = await Viewers.getNews("Viewers", employee_id);
            if (data) {
                return true;
            } else throw Error;
        } catch (error) {
            return false;
        }
    },
    insertViewers: async (table: Table, payload: Payload) => {
        try {
            const data = await Viewers.getNews("Viewers", {
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

}