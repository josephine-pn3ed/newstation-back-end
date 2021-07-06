import { Payload, Id } from "../../model/Administrator/types";
import { v4 as uuid_v4 } from "uuid";

const {
  getAdministrators,
  getAdministratorById,
  getAdministratorByEmail,
  insertUserAdministrator,
  updateAdministrator,
  updateAdministratorByStatus,
  deleteAdministrator,
} = require("../../model/Administrator");
const { getEmployeeByEmail } = require("../../model/Employee");
const { getCompanyByEmail } = require("../../model/Company");

module.exports = {
  getAdministrators: async (id: Id) => {
    try {
      const data = await getAdministrators("User", id, 1);
      if (!data.length) return "No administrator found!";
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
  getAdministratorById: async (id: Id) => {
    try {
      const data = await getAdministratorById("User", id);
      if (!data) return "No administrator found!";
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
  insertAdministrator: async (payload: Payload) => {
    if (!payload) return "Invalid credentials.";
    const { email_address, first_name, last_name, position } = payload;
    if (!email_address) return "Email address is empty.";
    if (!first_name) return "First name is empty.";
    if (!last_name) return "Last name is empty.";
    if (!position) return "Position is empty.";

    try {
      const { email_address, first_name, last_name } = payload;
      const empId = uuid_v4();
      const checkEmployeeEmail = await getEmployeeByEmail(
        "User",
        email_address
      );

      if (checkEmployeeEmail.length) {
        return "Email address has already been taken.";
      }
      const checkAdministratorEmail = await getAdministratorByEmail(
        "User",
        email_address
      );

      if (checkAdministratorEmail.length) {
        return "Email address has already been taken.";
      }
      const checkCompanyEmail = await getCompanyByEmail(
        "Company",
        email_address
      );

      if (checkCompanyEmail.length) {
        return "Email address has already been taken.";
      }
      const data = await insertUserAdministrator("User", {
        ...payload,
        id: empId,
        role_id: 1,
        password:
          first_name.charAt(0).toUpperCase() +
          last_name.charAt(0).toUpperCase() +
          last_name.slice(1) +
          "@" +
          empId.slice(0, 5),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: "Active",
      });
      
      if (!data.inserted) return "Administrator not added!";
      return "Administrator added successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  updateAdministrator: async (id: Id, payload: Payload) => {
    try {
      const data = await updateAdministrator("User", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) return "Administrator not updated!";
      return "Administrator updated successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  updateAdministratorByStatus: async (id: Id) => {
    try {
      const data = await updateAdministratorByStatus("User", id, {
        status: "Active",
        updated_at: new Date().toISOString(),
      });

      if (!data.replaced) return "Administrator not restored!";
      return "Administrator restored successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  deleteAdministrator: async (id: Id) => {
    try {
      const data = await deleteAdministrator("User", id, {
        status: "Inactive",
        updated_at: new Date().toISOString(),
      });

      if (!data.replaced) return "Administrator not deleted!";
      return "Administrator deleted successfully!";
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
