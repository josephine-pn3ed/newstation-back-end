import { Payload, Id } from "../../model/Company/types";
import { v4 as uuid_v4 } from "uuid";
const {
  getCompany,
  insertCompany,
  getCompanyByEmail,
  deleteCompany,
  updateCompany,
} = require("../../model/Company");

module.exports = {
  getCompany: async (id: Id) => {
    try {
      const data = await getCompany("Company", id);
      
      if (!data) return "No company found!";
      return data;
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  insertCompany: async (payload: Payload) => {
    if (!payload) return "Invalid credentials.";
    const { email_address, name, password } = payload;
    if (!email_address) return "Email address is empty.";
    if (!name) return "Name is empty.";
    if (!password) return "Password is empty.";
  
    try {
      const { email_address } = payload;

      const checkEmail = await getCompanyByEmail("Company", email_address);
      if (checkEmail.length) return "Email address has already been taken!";

      const data = await insertCompany("Company", {
        ...payload,
        id: uuid_v4(),
        status: "Active",
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      });

      if (!data.inserted) return "Company not added!";
      return "Company added successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  updateCompany: async (id: Id, payload: Payload) => {
    try {
      if (!id) throw Error;
      const data = await updateCompany("Company", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) return "Company not updated!";
      return "Company updated successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  deleteCompany: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await deleteCompany("Company", id, {
        status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) return "Company not deleted!";
      return "Company deleted successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
};
