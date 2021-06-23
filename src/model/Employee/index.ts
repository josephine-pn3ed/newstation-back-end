import { Table, Email, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
    getEmployees: async (table: Table, id: Id) => {
        const data = await db.table(table).filter({ "company_id": id }).run();
        return data;
    },
    getEmployeeById: async (table: Table, id: Id) => {
        const data = await db.table(table).get(id).run();
        return data;
    },
    getEmployeeByEmail: async (table: Table, email: Email) => {
        const data = await db.table(table).filter({ "employee_email_address": email }).run();
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
    updateEmployeeByStatus: async (table: Table, id: Id, payload: Payload) => {
        const data = await db.table(table).get(id).update(payload).run();
        return data;
    },
    deleteEmployee: async (table: Table, id: Id, payload: Payload) => {
        const data = await db.table(table).get(id).update(payload).run();
        return data;
    }
}