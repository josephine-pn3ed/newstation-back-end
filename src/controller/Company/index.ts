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
      const data = await getCompany("Companies", id);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertCompany: async (payload: Payload) => {
    try {
      const { company_email_address } = payload;
      const checkEmail = await getCompanyByEmail(
        "Companies",
        company_email_address
      );
      if (!checkEmail.length) {
        const data = await insertCompany("Companies", {
          ...payload,
          id: uuid_v4(),
          company_status: "Active",
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
        });
        if (data) {
          return { message: data };
        } else throw Error;
      } else return { message: "Email address has already been taken." };
    } catch (error) {
      return false;
    }
  },
  updateCompany: async (id: Id, payload: Payload) => {
    try {
      const data = await updateCompany("Companies", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  deleteCompany: async (id: Id) => {
    try {
      const data = await deleteCompany("Companies", id, {
        company_status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
};
