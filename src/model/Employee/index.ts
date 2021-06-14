import { Table, Email, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
    getEmployee: async (table: Table, email: Email) => {
        const data = await db.table(table).filter({ employee_email: email }).run();
        return data;
    },
    insertEmployee: async (table: Table, payload: Payload) => {
        const data = await db.table(table).insert(payload).run();
        return data;
    },
    updateEmployee: async (table: Table, id: Id, payload: Payload) => {
        const data = await db.table(table).get(id).update(payload).run();
        return data;
    },
    deleteEmployee: async (table: Table, id: Id, payload: Payload) => {
        const data = await db.table(table).get(id).update(payload).run();
        return data;
    }
}