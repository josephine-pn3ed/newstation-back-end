import { Payload, Id } from "../../model/Employee/types";
import { v4 as uuid_v4 } from "uuid";

const {
  getEmployees,
  getEmployeeById,
  getEmployeeByEmail,
  insertEmployee,
  updateEmployee,
  updateEmployeeByStatus,
  deleteEmployee,
} = require("../../model/Employee");
const { getCompanyByEmail } = require("../../model/Company");

module.exports = {
  getEmployees: async (id: Id) => {
    try {
      const data = await getEmployees("User", id, 2);
      if (!data.length) return "No employee found!";
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
  getEmployeeById: async (id: Id) => {
    try {
      const data = await getEmployeeById("User", id);
      if (!data) return "No employee found!";
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
  insertEmployee: async (payload: Payload) => {
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

      const checkCompanyEmail = await getCompanyByEmail(
        "Company",
        email_address
      );
      if (checkCompanyEmail.length) {
        return "Email address has already been taken.";
      }

      const data = await insertEmployee("Users", {
        ...payload,
        id: empId,
        role_id: 2,
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
      if (!data.inserted) return "Employee not added!";
      return { message: "Employee added successfully!" };
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  updateEmployee: async (id: Id, payload: Payload) => {
    try {
      const data = await updateEmployee("User", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) return "Employee not updated!";
      return "Employee updated sucessfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  updateEmployeeByStatus: async (id: Id) => {
    try {
      const data = await updateEmployeeByStatus("User", id, {
        status: "Active",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) return "Employee not restored!";
      return "Employee restored successfully!";
    } catch (error) {
      const { message } = error;
      if (
        message ===
        "None of the pools have an opened connection and failed to open a new one."
      )
        return "Database down!";
    }
  },
  deleteEmployee: async (id: Id) => {
    try {
      const data = await deleteEmployee("User", id, {
        status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) return "Employee not deleted!";
      return "Employee deleted successfully!";
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
