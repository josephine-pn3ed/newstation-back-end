import { ID, employeePayload, News } from "./types";
const { showAllEmployees, showAllCompanies, enrolEmployee, unenrolEmployee, updateEmployee, addNews, readNews } = require("../../model")

module.exports = {
    getAllEmployees: async (id: ID) => {
        try {

            let data = await showAllEmployees(id);

            return data.length
                ? { status: "Success! Data Retrieved.", data }
                : "<center><h2>status: 🤕 ERROR RETRIEVING DATA: DATA NOT FOUND! </h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },
    getAllCompanies: async () => {
        try {

            let data = await showAllCompanies();
            console.log(data);
            return data.length
                ? { status: "Success! Data Retrieved.", data }
                : "<center><h2>status: 🤕 ERROR RETRIEVING DATA: DATA NOT FOUND! </h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },
    putEmployee: async (payload: employeePayload) => {
        try {
            let data;
            let date: string = new Date().toISOString();
            //checks if object has entries
            return Object.entries(payload).length ? (data = await enrolEmployee({
                ...payload,
                created_at: date,
                updated_at: date,
                //id: id, 
                status: "active",
            })) : "<center><h2>status: 🤕 ERROR ADDING DATA </h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },
    deleteEmployee: async (id: ID) => {
        try {
            let data = await unenrolEmployee(id);
            return data.replaced
                ? { status: `Already Deleted! id:${id}`, data }
                : "<center><h2>status: 🤕 ERROR EMPLOYEE DATA NOT FOUND</h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },
    updatePayloadEmployee: async (id: ID, payload: employeePayload) => {
        try {
            const data = await updateEmployee(id, {
                ...payload,
                dateUpdated: new Date().toISOString(),
            });

            return data.replaced ? { status: `Success! UPDATED id: ${id}`, data } : "<center><h2>status: 🤕 ERROR! Update Failed.</h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },
    postNews: async (payload: News) => {
        try {
            let data;
            let date: string = new Date().toISOString();
            //checks if object has entries
            return Object.entries(payload).length ? (data = await addNews({
                ...payload,
                created_at: date,
                updated_at: date,
                //id: id, 
                status: "active",
            })) : "<center><h2>status: 🤕 ERROR ADDING DATA </h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },
    displayNews: async (id: ID) => {
        try {

            let data = await readNews(id);

            return data.length
                ? { status: "Success! Data Retrieved.", data }
                : "<center><h2>status: 🤕 ERROR RETRIEVING DATA: DATA NOT FOUND! </h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },

};