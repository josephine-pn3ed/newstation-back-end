import { Table, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
    getViewers: async (table: Table, news_id: Id) => {
        const data = await db.table(table).get(news_id).run();
        return data;
    },
    insertViewers: async (table: Table, payload: Payload) => {
        const data = await db.table(table).insert(payload).run();
        return data;
    },

}