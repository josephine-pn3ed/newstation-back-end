import { Payload, Id, Email, Password } from '../../model/Company/types';
import { v4 as uuid_v4 } from 'uuid';

const { getCompany, insertCompany, getCompanyByEmail } = require('../../model/Company');

module.exports = {
  getCompany: async (id: Id) => {
    try {
      const data = await getCompany("Companies", id);
      if (data) {
        return true;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  loginCompany: async (payload: Payload) => {
    try {
      const { company_email_address, company_password } = payload;
      const data = await getCompanyByEmail("Companies", company_email_address);
      if (data) {
        if (data[0].company_password === company_password) {
          return {"message": "Login successfully."};
        } else return {"message": "Wrong password."}
      } else throw Error;
    } catch (error) {
      return {"message": "Invalid credentials!"};
    }
  },
  insertCompany: async (payload: Payload) => {
    try {
      const { company_email_address } = payload;
      const checkEmail = await getCompanyByEmail("Companies", company_email_address);
      if (!checkEmail.length) {
        const data = await insertCompany("Companies",
          {
            ...payload,
            id: uuid_v4(),
            company_status: 'Active',
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
          });
        if (data) {
          return { "message": data };
        } else throw Error;
      } else return { "message": "Email address has already been taken." };
    } catch (error) {
      return false;
    }
  }
}