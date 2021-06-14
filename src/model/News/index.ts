import { Table, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
    getNews: async (table: Table, company_id: Id) => {
        const data = await db.table(table, company_id).run();
        return data;
    },
    insertNews: async (table: Table, payload: Payload) => {
        const data = await db.table(table).insert(payload).run();
        return data;
    },
    updateNews: async (table: Table, id: Id, payload: Payload) => {
        const data = await db.table(table).get(id).update(payload).run();
        return data;
    },
    deleteNews: async (table: Table, id: Id, payload: Payload) => {
        const data = await db.table(table).get(id).update(payload).run();
        return data;
    },
}