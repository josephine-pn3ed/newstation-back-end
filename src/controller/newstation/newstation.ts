import { employeePayload } from "../../model/types";
import { } from "./types";
const db = require('../../db')



module.exports = {
    showAllEmployees: async (Payload: employeePayload) => {
        const data = await db.table("Employees").filter({ status: "active" }).run();
        return data;
    },
};