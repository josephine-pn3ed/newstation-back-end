import { Payload, Id, Email, Password } from '../../model/Company/types';
import { v4 as uuid_v4 } from 'uuid';

const Company = require('../../model/Company');

module.exports = {
  getCompany: async (email: Email, password: Password) => {
    try {
      const data = await Company.getCompany("Companies", email);
      if (data && (data.company_password === password)) {
        return true;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertCompany: async (payload: Payload) => {
    try {
      const data = await Company.insertCompany("Companies",
        {
          ...payload,
          id: uuid_v4(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  updateCompany: async (id: Id, payload: Payload) => {
    try {
      const data = await Company.updateCompany("Companies", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    }
    catch (error) {
      return false;
    }
  },
  deleteCompany: async (id: Id) => {
    try {
      const data = await Company.deleteCompany("Companies", id, {
        company_status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    }
    catch (error) {
      return false;
    }
  },
  loginCompany: async (payload: Payload) => {
    try {
      const { company_email_address, company_password } = payload;
      const data = await Company.getCompanyByEmail("Companies", company_email_address);
      if (data) {
        if (data[0].company_password === company_password) {
          return { "message": "Login successfully." };
        } else return { "message": "Wrong password." }
      } else throw Error;
    } catch (error) {
      return { "message": "Invalid credentials!" };
    }
  },

}