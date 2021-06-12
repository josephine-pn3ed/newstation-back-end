import { ID } from "./types";
const { showAllEmployees, showAllCompanies } = require("../../model")

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
    getAllCompanies: async (id: ID) => {
        try {

            let data = await showAllCompanies(id);

            return data.length
                ? { status: "Success! Data Retrieved.", data }
                : "<center><h2>status: 🤕 ERROR RETRIEVING DATA: DATA NOT FOUND! </h2></center>";
        } catch (error) {
            console.log("Error!");
        }
    },
};