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
      if (!id) throw Error;
      const data = await getCompany("Company", id);
      if (!data) throw Error;
      return data;
    } catch (error) {
      return false;
    }
  },
  insertCompany: async (payload: Payload) => {
    try {
      const { email_address, name, password } = payload;
      if (!email_address || !name || !password) throw Error;

      const checkEmail = await getCompanyByEmail("Company", email_address);
      if (checkEmail.length) throw Error;

      const data = await insertCompany("Company", {
        ...payload,
        id: uuid_v4(),
        status: "Active",
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      });

      if (!data.inserted)
        return { message: "Email address has already been taken." };
      return { message: data };
    } catch (error) {
      return false;
    }
  },
  updateCompany: async (id: Id, payload: Payload) => {
    try {
      if (!id) throw Error;
      const data = await updateCompany("Company", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (!data.replaced) throw Error;
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteCompany: async (id: Id) => {
    try {
      if (!id) throw Error;
      const data = await deleteCompany("Company", id, {
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
