import { Table, Email, Payload, Id, Role_Id } from './types';

const db = require('../../../db');

module.exports = {
    getEmployees: async (table: Table, id: Id, role_id: Role_Id) => {
        const data = await db.table(table).filter({ "company_id": id, "role_id": role_id }).run();
        console.log(data)
        return data;
    },
    getEmployeeById: async (table: Table, id: Id) => {
        const data = await db.table(table).get(id).run();
        return data;
    },
    getEmployeeByEmail: async (table: Table, email: Email) => {
        const data = await db.table(table).filter({ "user_email_address": email }).run();
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