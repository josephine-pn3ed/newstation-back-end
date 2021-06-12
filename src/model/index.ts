import { companyPayload, employeePayload, ID, Table } from './types'
const db = require('../../db');

module.exports = {
    showAllEmployees: async (company_id: ID) => {
        const data = await db.table("Employees").filter({ company_id: company_id, status: "active" }).run();
        return data;
    },
    showAllCompanies: async (company_id: ID) => {
        const data = await db.table("Companies").filter({ company_id: company_id }).run();
        return data;
    },
    enrolCompany: async (payload: companyPayload) => {
        const data = await db.table("Companies").insert(payload).run();
        return data;
    },
    enrolEmployee: async (company_id: ID, payload: employeePayload) => {
        const data = await db.table("Employees").insert(payload).run();
        return data;
    },

};