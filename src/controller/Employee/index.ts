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
      if (!id) throw Error;
      const data = await getEmployees("User", id, 2);
      if (!data) throw Error;
      return data;
    } catch (error) {
      return false;
    }
  },
  getEmployeeById: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await getEmployeeById("User", id);
      if (!data) throw Error;
      return data;
    } catch (error) {
      return false;
    }
  },
  insertEmployee: async (payload: Payload) => {
    try {
      const { email_address, first_name, last_name, position } = payload;
      if (!email_address || !first_name || !last_name || !position) throw Error;

      const empId = uuid_v4();
      const checkEmployeeEmail = await getEmployeeByEmail(
        "User",
        email_address
      );
      if (checkEmployeeEmail.length) {
        return { message: "Email address has already been taken." };
      }

      const checkCompanyEmail = await getCompanyByEmail(
        "Company",
        email_address
      );
      if (checkCompanyEmail.length) {
        return { message: "Email address has already been taken." };
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
      if (!data.inserted) throw Error;
      return { message: "Employee added successfully!" };
    } catch (error) {
      return error;
    }
  },
  updateEmployee: async (id: Id, payload: Payload) => {
    try {
      if (!id) throw Error;
      const data = await updateEmployee("User", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
  updateEmployeeByStatus: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await updateEmployeeByStatus("User", id, {
        status: "Active",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteEmployee: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await deleteEmployee("User", id, {
        status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
};
