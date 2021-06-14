import { Table, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
    getViewers: async (table: Table, news_id: Id) => {
        const data = await db.table(table, news_id).run();
        return data;
    },

}