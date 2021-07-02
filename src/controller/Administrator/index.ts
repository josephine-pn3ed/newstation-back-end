import { Payload, Id } from "../../model/Administrator/types";
import { v4 as uuid_v4 } from "uuid";

const {
  getAdministrators,
  getAdministratorById,
  getAdministratorByEmail,
  insertAdministrator,
  updateAdministrator,
  updateAdministratorByStatus,
  deleteAdministrator,
} = require("../../model/Administrator");
const { getCompanyByEmail } = require("../../model/Company");

module.exports = {
  getAdministrators: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await getAdministrators("User", id, 1);
      if (!data) throw Error;
      return data;
    } catch (error) {
      return false;
    }
  },
  getAdministratorById: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await getAdministratorById("User", id);
      if (!data) throw Error;
      return data;
    } catch (error) {
      return false;
    }
  },
  insertAdministrator: async (payload: Payload) => {
    try {
      const { email_address, first_name, last_name, position } = payload;
      if (!email_address || !first_name || !last_name || !position) throw Error;
      const empId = uuid_v4();
      const checkEmployeeEmail = await getAdministratorByEmail(
        "User",
        email_address
      );
      console.log("employee", checkEmployeeEmail)
      if (checkEmployeeEmail.length) {
        return { message: "Email address has already been taken." };
      }
      const checkCompanyEmail = await getCompanyByEmail(
        "Company",
        email_address
      );
      console.log("company", checkCompanyEmail);
      
      if (checkCompanyEmail.length) {
        return { message: "Email address has already been taken." };
      }
      const data = await insertAdministrator("User", {
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
      if (!data.inserted) throw Error;
      return { message: "Administrator added successfully!" };
    } catch (error) {
      console.log(error.message)
      return error;
    }
  },
  updateAdministrator: async (id: Id, payload: Payload) => {
    try {
      if (!id) throw Error;
      const data = await updateAdministrator("User", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
  updateAdministratorByStatus: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await updateAdministratorByStatus("User", id, {
        status: "Active",
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteAdministrator: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await deleteAdministrator("User", id, {
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
