import { Table, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
    getViewers: async (table: Table, id: Id) => {
        const data = await db.table(table).filter({ news_id: id }).run();
        return data;
    },
    insertViewers: async (table: Table, payload: Payload) => {
        const data = await db.table(table).insert(payload).run();
        return data;
    },
    updateViewers: async (table: Table, id: Id, payload: Payload) => {
        const data = await db.table(table).get(id).update(payload).run();
        return data;
    },
    // deleteViewers: async (table: Table, id: Id, payload: Payload) => {
    //     const data = await db.tale(table).get(id).update(payload).run();
    //     return data;
    // }

}