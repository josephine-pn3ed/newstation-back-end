import { employeePayload, ID, Table, News } from './types'
const db = require('../../db');

module.exports = {
    showAllEmployees: async (company_id: ID) => {
        const data = await db.table("Employees").filter({ company_id: company_id, status: "active" }).run();
        return data;
    },
    showAllCompanies: async () => {
        const data = await db.table("Companies").filter({ status: "active" }).run();
        return data;
    },
    // enrolCompany: async (payload: companyPayload) => {
    //     const data = await db.table("Companies").insert(payload).run();
    //     return data;
    // },
    enrolEmployee: async (payload: employeePayload) => {
        const data = await db.table("Employees").insert(payload).run();
        return data;
    },
    unenrolEmployee: async (table: Table, id: ID) => {
        const data = await db.table('Employees').filter({ id: id, status: "active" }).update({ status: "inactive" }).run();
        return data;
    },
    updateEmployee: async (id: ID, payload: employeePayload) => {
        const data = await db.table('Employees').filter({ id: id, status: "active" }).update(payload).run();
        return data;
    },
    addNews: async (payload: News) => {
        const data = await db.table("Tables").insert(payload).run();
        return data;
    },
    readNews: async (company_id: ID) => {
        const data = await db.table("News").filter({ company_id: company_id, status: "active" }).run();
        return data;
    },



};