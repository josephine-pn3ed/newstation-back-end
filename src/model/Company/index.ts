import { Table, Email, Payload, Id } from './types';

const db = require('../../../db');

module.exports = {
  getCompany: async (table: Table, id: Id) => {
    const data = await db.table(table).get(id).run();
    return data;
  },
  loginCompany: async (table: Table, email: Email) => {
    const data = await db.table(table).filter({ "company_email_address": email }).run();
    return data;
  },
  insertCompany: async (table: Table, payload: Payload) => {
    const data = await db.table(table).insert(payload).run();
    return data;
  },
  updateCompany: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
  deleteCompany: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  }
}