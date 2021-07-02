import { Table, Email, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
    getCompany: async (table: Table, id: Id) => {
        return await db.table(table).get(id).run();
    },
    getCompanyByEmail: async (table: Table, email: Email) => {
        return await db.table(table).filter({ "company_email_address": email }).run();
    },
    insertCompany: async (table: Table, payload: Payload) => {
        return await db.table(table).insert(payload).run();
    },
    updateCompany: async (table: Table, id: Id, payload: Payload) => {
        return await db.table(table).get(id).update(payload).run();
    },
    deleteCompany: async (table: Table, id: Id, payload: Payload) => {
        return await db.table(table).get(id).update(payload).run();
    }
}
